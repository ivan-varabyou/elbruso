#!/usr/bin/env python3
"""
Backup script for Qdrant collections to GitHub.
Uses GitHub token from IDE environment (gh CLI or GH_TOKEN env var).
"""

import os
import subprocess
import json
from datetime import datetime
from qdrant_client import QdrantClient

# Configuration
repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backups_folder = os.path.join(repo_root, "backups")

def get_gh_token():
    token = os.environ.get('GH_TOKEN', '')
    if token:
        return token
    try:
        result = subprocess.run(
            ["gh", "auth", "token"], capture_output=True, text=True, check=False
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except FileNotFoundError:
        pass
    return ''

GITHUB_TOKEN = get_gh_token()

if not GITHUB_TOKEN:
    print("Warning: GitHub token not found. Git push will fail.")
    # We'll allow it to continue for local verification, but push will fail later.
    GITHUB_TOKEN = "placeholder"

QDRANT_URL = os.environ.get('QDRANT_URL', 'http://localhost:7999')
client = QdrantClient(url=QDRANT_URL)


def get_collections():
    collections = client.get_collections().collections
    return [c.name for c in collections]


def create_snapshot(collection_name: str):
    result = client.create_snapshot(collection_name=collection_name)
    return result.name


def download_snapshot(collection_name: str, snapshot_name: str) -> str:
    os.makedirs(backups_folder, exist_ok=True)
    filename = f"{collection_name}_{datetime.now().strftime('%Y-%m-%d')}.snapshot"
    filepath = os.path.join(backups_folder, filename)
    client.download_snapshot(
        collection_name=collection_name,
        snapshot_name=snapshot_name,
        filename=filepath
    )
    return filepath


def create_manifest(collections_info: dict) -> str:
    manifest = {
        "created_at": datetime.now().isoformat(),
        "qdrant_url": qdrant_url,
        "collections": collections_info
    }
    manifest_path = os.path.join(backups_folder, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    return manifest_path


def git_commit_push(message: str):
    project_path = os.environ.get('PROJECT_PATH')
    # If PROJECT_PATH is set, use it as the git root, otherwise use the server repo root
    git_root = project_path if project_path and os.path.isdir(project_path) else repo_root
    
    project_name = os.environ.get('PROJECT_NAME', '')
    branch_name = os.environ.get('MEMORY_BRANCH', f"memory/{project_name}" if project_name else "main")
    
    subprocess.run(["git", "add", "."], cwd=git_root, check=True)
    result = subprocess.run(
        ["git", "status", "--porcelain"], cwd=git_root, capture_output=True, text=True
    )
    if result.stdout.strip():
        # Configuration for git user if not set globally
        subprocess.run(["git", "config", "user.name", "Ivan Varabyou"], cwd=git_root, check=True)
        subprocess.run(["git", "config", "user.email", "ivan@example.com"], cwd=git_root, check=True)
        
        # Check if branch exists, if not create it
        branches = subprocess.run(
            ["git", "branch", "-a"], cwd=git_root, capture_output=True, text=True
        ).stdout
        if branch_name not in branches:
            subprocess.run(["git", "checkout", "-b", branch_name], cwd=git_root, check=True)
        else:
            # Checkout existing branch, handling cases where we might be on it already
            subprocess.run(["git", "checkout", branch_name], cwd=git_root, check=True)

        subprocess.run(
            ["git", "commit", "-m", message],
            cwd=git_root, check=True
        )
        subprocess.run(
            ["git", "-c", f"credential.helper=!gh auth token", "push", "origin", branch_name],
            cwd=git_root, check=True
        )
        print(f"Pushed backup to branch {branch_name} in {git_root}: {message}")
        
        # Switch back to the previous branch if we were on a custom one
        # Note: In a CI/CD or automated script, switching back might not be necessary,
        # but for local runs it's cleaner.
        if branch_name != "main" and not project_path:
             subprocess.run(["git", "checkout", "main"], cwd=git_root, check=True)
    else:
        print(f"No changes to commit in {git_root}")


def main():
    project_name = os.environ.get('PROJECT_NAME', 'default')
    project_path = os.environ.get('PROJECT_PATH')
    
    global backups_folder
    if project_path and os.path.isdir(project_path):
        backups_folder = os.path.join(project_path, ".elbruso", "context")
    
    if not os.path.exists(backups_folder):
        os.makedirs(backups_folder, exist_ok=True)
    
    print(f"Starting backup for project '{project_name}' at {datetime.now().isoformat()}")
    print(f"Target folder: {backups_folder}")
    
    collections = get_collections()
    # Filter collections by project prefix
    project_collections = [c for c in collections if c.startswith(f"{project_name}_")] if project_name != 'default' else collections
    
    print(f"Found {len(project_collections)} collections to backup: {project_collections}")
    
    collections_info = {}
    for collection in project_collections:
        try:
            print(f"Creating snapshot for {collection}...")
            snapshot_name = create_snapshot(collection)
            filepath = download_snapshot(collection, snapshot_name)
            size = os.path.getsize(filepath)
            collections_info[collection] = {
                "snapshot_file": os.path.basename(filepath),
                "size_bytes": size,
                "snapshot_name": snapshot_name
            }
            print(f"  Saved: {filepath} ({size} bytes)")
        except Exception as e:
            print(f"  Error backing up {collection}: {e}")
            collections_info[collection] = {"error": str(e)}
    
    manifest_path = create_manifest(collections_info)
    print(f"Created manifest: {manifest_path}")
    
    commit_message = f"Backup: {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    git_commit_push(commit_message)
    
    print("Backup complete!")


if __name__ == "__main__":
    main()
