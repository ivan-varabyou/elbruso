"""
Memory Graph Generator - Creates interactive visualization of memory database.
Generates HTML graph using PyVis + NetworkX from Qdrant data.
"""

import os
import sys
from datetime import datetime
from typing import List, Dict, Tuple, Optional
import json

os.environ["TRANSFORMERS_VERBOSITY"] = "error"
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["QDRANT_URL"] = os.getenv("QDRANT_URL", "http://localhost:7999")
os.environ["PROJECT_NAME"] = os.getenv("PROJECT_NAME", "elbruso")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import torch
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from transformers import AutoTokenizer, AutoModel
import networkx as nx
from pyvis.network import Network

from logging_config import setup_logging

logger = setup_logging()

qdrant_url = os.getenv("QDRANT_URL", "http://localhost:7999")
project_name = os.getenv("PROJECT_NAME", "")
prefix = f"{project_name}_" if project_name else ""

collection_core = prefix + os.getenv("AGENT_CORE_COLLECTION", "agent_core")
collection_tasks = prefix + os.getenv("TASKS_COLLECTION", "task_summaries")
collection_knowledge = prefix + os.getenv("KNOWLEDGE_COLLECTION", "knowledge_base")

embedding_model_name = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en-v1.5")

logger.info(f"Loading embedding model: {embedding_model_name}")
tokenizer = AutoTokenizer.from_pretrained(embedding_model_name)
model = AutoModel.from_pretrained(embedding_model_name)
model.eval()
EMBEDDING_DIM = model.config.hidden_size
logger.info(f"Model loaded: {embedding_model_name} (dim: {EMBEDDING_DIM})")

client = QdrantClient(url=qdrant_url)


def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = (
        attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    )
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(
        input_mask_expanded.sum(1), min=1e-9
    )


def get_embedding(text: str) -> List[float]:
    encoded = tokenizer(
        text, return_tensors="pt", padding=True, truncation=True, max_length=512
    )
    with torch.no_grad():
        output = model(**encoded)
    embedding = mean_pooling(output, encoded["attention_mask"])
    return embedding[0].tolist()


def ensure_collection(name: str):
    collections = client.get_collections().collections
    names = [c.name for c in collections]
    if name not in names:
        client.create_collection(
            collection_name=name,
            vectors_config=VectorParams(size=EMBEDDING_DIM, distance=Distance.COSINE),
        )


def get_all_collections() -> List[str]:
    collections = client.get_collections().collections
    return [c.name for c in collections]


def get_collection_name_by_type(memory_type: str) -> str:
    type_to_collection = {
        "core": collection_core,
        "task": collection_tasks,
        "knowledge": collection_knowledge,
    }
    return type_to_collection.get(memory_type, collection_core)


def get_all_memory_entries() -> List[Dict]:
    all_entries = []

    for collection_name in get_all_collections():
        try:
            results = client.scroll(collection_name=collection_name, limit=1000)[0]
            for r in results:
                entry = {
                    "id": r.id,
                    "content": r.payload.get("content", ""),
                    "type": r.payload.get("type", "core"),
                    "collection": collection_name,
                    "created_at": r.payload.get("created_at", ""),
                    "metadata": r.payload.get("metadata", {}),
                }
                all_entries.append(entry)
        except Exception as e:
            logger.warning(f"Could not read collection {collection_name}: {e}")

    return all_entries


def create_vector_similarity_graph(
    entries: List[Dict], threshold: float = 0.7
) -> Tuple[Dict, Dict]:
    if len(entries) < 2:
        return {}, {}

    contents = [e["content"] for e in entries]
    logger.info(f"Computing embeddings for {len(contents)} entries...")

    embeddings = [get_embedding(c) for c in contents]

    node_weights = {entry["id"]: 1 for entry in entries}
    edges = {}

    for i in range(len(entries)):
        for j in range(i + 1, len(entries)):
            e1, e2 = entries[i], entries[j]
            vec1, vec2 = embeddings[i], embeddings[j]

            dot = sum(a * b for a, b in zip(vec1, vec2))
            norm1 = sum(a * a for a in vec1) ** 0.5
            norm2 = sum(b * b for b in vec2) ** 0.5
            similarity = dot / (norm1 * norm2 + 1e-9)

            if similarity >= threshold:
                edge_key = tuple(sorted([e1["id"], e2["id"]]))
                edges[edge_key] = {
                    "similarity": similarity,
                    "type": "vector",
                }
                node_weights[e1["id"]] = node_weights.get(e1["id"], 1) + 1
                node_weights[e2["id"]] = node_weights.get(e2["id"], 1) + 1

    return node_weights, edges


def create_metadata_links(entries: List[Dict]) -> Dict:
    metadata_links = {}

    for i, entry1 in enumerate(entries):
        metadata1 = entry1.get("metadata", {})
        if not metadata1:
            continue

        for j, entry2 in enumerate(entries):
            if i >= j:
                continue

            metadata2 = entry2.get("metadata", {})
            if not metadata2:
                continue

            common_keys = set(metadata1.keys()) & set(metadata2.keys())
            if common_keys:
                edge_key = tuple(sorted([entry1["id"], entry2["id"]]))
                metadata_links[edge_key] = {
                    "common_keys": list(common_keys),
                    "type": "metadata",
                }

    return metadata_links


def get_node_color(memory_type: str) -> str:
    colors = {
        "core": "#3b82f6",
        "task": "#22c55e",
        "knowledge": "#f97316",
    }
    return colors.get(memory_type, "#6b7280")


def get_node_size(weight: int, base_size: int = 20, max_size: int = 60) -> int:
    size = base_size + (weight - 1) * 10
    return min(size, max_size)


def get_node_label(content: str, max_length: int = 40) -> str:
    if len(content) <= max_length:
        return content
    return content[:max_length] + "..."


def generate_memory_graph(
    output_path: str = "docs/memory-graph.html",
    vector_threshold: float = 0.7,
    dark_mode: bool = True,
    physics_enabled: bool = True,
) -> str:
    logger.info("Starting memory graph generation...")

    entries = get_all_memory_entries()
    logger.info(f"Found {len(entries)} memory entries")

    if not entries:
        logger.warning("No entries found, creating empty graph")
        return create_empty_graph(output_path, dark_mode)

    node_weights, vector_edges = create_vector_similarity_graph(
        entries, vector_threshold
    )
    metadata_edges = create_metadata_links(entries)

    all_edges = {**vector_edges, **metadata_edges}
    logger.info(f"Found {len(all_edges)} connections between entries")

    net = Network(
        height="90vh",
        width="100%",
        bgcolor="#1a1a2e" if dark_mode else "#ffffff",
        font_color="#ffffff" if dark_mode else "#000000",
        directed=False,
        notebook=False,
        select_menu=True,
        filter_menu=True,
    )

    for entry in entries:
        node_id = entry["id"]
        weight = node_weights.get(node_id, 1)
        color = get_node_color(entry["type"])
        size = get_node_size(weight)

        label = get_node_label(entry["content"])

        title = f"""
<b>{entry["type"].upper()}</b><br>
{entry["content"]}<br>
<br>
<b>ID:</b> {node_id[:16]}...<br>
<b>Collection:</b> {entry["collection"]}<br>
<b>Created:</b> {entry["created_at"][:19] if entry["created_at"] else "N/A"}
"""
        if entry.get("metadata"):
            title += f"<br><b>Metadata:</b> {json.dumps(entry['metadata'], indent=2)}"

        net.add_node(
            node_id,
            label=label,
            title=title,
            color=color,
            size=size,
            font={"size": 14, "color": "#ffffff" if dark_mode else "#000000"},
        )

    for edge_key, edge_data in all_edges.items():
        id1, id2 = edge_key
        edge_type = edge_data["type"]
        similarity = edge_data.get("similarity", 0)

        if edge_type == "vector":
            color = "#ef4444"
            width = 1 + similarity * 3
            title = f"Vector similarity: {similarity:.2f}"
        else:
            common_keys = edge_data.get("common_keys", [])
            color = "#a855f7"
            width = 2
            title = f"Shared metadata: {', '.join(common_keys)}"

        net.add_edge(
            id1,
            id2,
            color=color,
            width=width,
            title=title,
        )

    net.set_options(
        """
var options = {
  "nodes": {
    "shapeProperties": {
      "interpolation": false
    }
  },
  "edges": {
    "smooth": {
      "type": "continuous",
      "forceDirection": "none",
      "roundness": 0.5
    }
  },
  "physics": {
    "enabled": """
        + str(physics_enabled).lower()
        + """,
    "barnesHut": {
      "gravitationalConstant": -3000,
      "centralGravity": 0.5,
      "springLength": 150,
      "springConstant": 0.04,
      "damping": 0.09,
      "avoidOverlap": 0.5
    },
    "maxVelocity": 50,
    "minVelocity": 0.1,
    "solver": "barnesHut",
    "stabilization": {
      "enabled": true,
      "iterations": 1000,
      "updateInterval": 25
    }
  },
  "interaction": {
    "dragNodes": true,
    "dragView": true,
    "zoomView": true,
    "hover": true,
    "selectConnectedEdges": true,
    "multiselect": true,
    "navigationButtons": true,
    "keyboard": {
      "enabled": true
    }
  }
}
"""
    )

    script = """
<div style="position: fixed; bottom: 20px; left: 20px; z-index: 1000;">
    <button onclick="location.reload()" style="
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    ">Refresh Graph</button>
</div>
<div style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; color: #888; font-size: 12px;">
    Scroll to zoom, drag to pan
</div>
"""
    html_content = net.generate_html()
    html_content = html_content.replace("</body>", script + "</body>")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    logger.info(f"Graph saved to: {output_path}")
    logger.info(f"Nodes: {len(entries)}, Edges: {len(all_edges)}")

    return output_path


def create_empty_graph(
    output_path: str = "memory-graph.html", dark_mode: bool = True
) -> str:
    net = Network(
        height="90vh",
        width="100%",
        bgcolor="#1a1a2e" if dark_mode else "#ffffff",
        font_color="#ffffff" if dark_mode else "#000000",
    )

    net.add_node(
        "empty",
        label="No memory entries yet",
        color="#6b7280",
        size=30,
        title="Memory database is empty.\nAdd some memories using the MCP tools!",
    )

    net.set_options(
        """
var options = {
  "nodes": {
    "shape": "box"
  },
  "physics": {
    "enabled": false
  }
}
"""
    )

    script = """
<div style="position: fixed; bottom: 20px; left: 20px; z-index: 1000;">
    <button onclick="location.reload()" style="
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
    ">Refresh Graph</button>
</div>
"""
    html_content = net.generate_html()
    html_content = html_content.replace("</body>", script + "</body>")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    return output_path


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate memory graph visualization")
    parser.add_argument(
        "--output",
        "-o",
        default="docs/memory-graph.html",
        help="Output HTML file path",
    )
    parser.add_argument(
        "--threshold",
        "-t",
        type=float,
        default=0.7,
        help="Vector similarity threshold (0-1)",
    )
    parser.add_argument(
        "--light",
        action="store_true",
        help="Use light theme instead of dark",
    )
    parser.add_argument(
        "--no-physics",
        action="store_true",
        help="Disable physics simulation",
    )

    args = parser.parse_args()

    output_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", args.output
    )
    output_path = os.path.normpath(output_path)

    generate_memory_graph(
        output_path=output_path,
        vector_threshold=args.threshold,
        dark_mode=not args.light,
        physics_enabled=not args.no_physics,
    )

    print(f"\nGraph generated successfully!")
    print(f"Open {output_path} in your browser to view.")
