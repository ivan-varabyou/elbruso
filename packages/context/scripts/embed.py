#!/usr/bin/env python3
"""
Embedding utilities for Elbruso Context.
"""

import os
from openai import OpenAI

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    """Generate embedding using OpenAI."""
    response = openai_client.embeddings.create(model=model, input=text)
    return response.data[0].embedding


def embed_batch(
    texts: list[str], model: str = "text-embedding-3-small"
) -> list[list[float]]:
    """Generate embeddings for multiple texts."""
    response = openai_client.embeddings.create(model=model, input=texts)
    return [data.embedding for data in response.data]


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
        embedding = get_embedding(text)
        print(f"Embedding dimension: {len(embedding)}")
        print(f"First 5 values: {embedding[:5]}")
