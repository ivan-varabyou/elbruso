#!/usr/bin/env python3
"""
Fix imports to use aliases instead of relative paths.
Usage: python scripts/fix-imports.py [--dry-run]
"""

import os
import re
import sys

SRC_DIR = "apps/api/src"

# Replacements: (pattern, replacement)
# Files use format: from '../../../database.database.service' (single quotes)
REPLACEMENTS = [
    # Fix ../../../database/... -> @database/...
    (r"from '\.\./\.\./\.\./(database/[^']+)'", r"from '@\1'"),
    # Fix ../../database/... -> @database/...
    (r"from '\.\./\.\./(database/[^']+)'", r"from '@\1'"),
    # Fix ../../config -> @config (from modules/)
    (r"from '\.\./\.\./config'", r"from '@config'"),
    # Fix ../../../modules/... -> @modules/...
    (r"from '\.\./\.\./\.\./(modules/[^']+)'", r"from '@\1'"),
    # Fix ../../modules/... -> @modules/... (from modules/)
    (r"from '\.\./\.\./(modules/[^']+)'", r"from '@\1'"),
    # Fix ../../shared/... -> @shared/...
    (r"from '\.\./\.\./(shared/[^']+)'", r"from '@\1'"),
    # Fix ../../auth/... -> @modules/auth/... (common pattern)
    (r"from '\.\./\.\./(auth/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../users/... -> @modules/users/... (common pattern)
    (r"from '\.\./\.\./(users/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../organizations/... -> @modules/organizations/... (common pattern)
    (r"from '\.\./\.\./(organizations/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../countries/... -> @modules/countries/... (common pattern)
    (r"from '\.\./\.\./(countries/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../seasons/... -> @modules/seasons/... (common pattern)
    (r"from '\.\./\.\./(seasons/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../sports/... -> @modules/sports/... (common pattern)
    (r"from '\.\./\.\./(sports/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../indicators/... -> @modules/indicators/... (common pattern)
    (r"from '\.\./\.\./(indicators/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../regions/... -> @modules/regions/... (common pattern)
    (r"from '\.\./\.\./(regions/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../events/... -> @modules/events/... (common pattern)
    (r"from '\.\./\.\./(events/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../audit/... -> @modules/audit/... (common pattern)
    (r"from '\.\./\.\./(audit/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../workspace/... -> @modules/workspace/... (common pattern)
    (r"from '\.\./\.\./(workspace/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../admin/... -> @modules/admin/... (common pattern)
    (r"from '\.\./\.\./(admin/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../pages/... -> @modules/pages/... (common pattern)
    (r"from '\.\./\.\./(pages/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../blocks/... -> @modules/blocks/... (common pattern)
    (r"from '\.\./\.\./(blocks/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../tables/... -> @modules/tables/... (common pattern)
    (r"from '\.\./\.\./(tables/[^']+)'", r"from '@modules/\1'"),
    # Fix ../../email/... -> @modules/email/... (common pattern)
    (r"from '\.\./\.\./(email/[^']+)'", r"from '@modules/\1'"),
    # Fix ../config -> @config (from gateway/)
    (r"from '\.\./config'", r"from '@config'"),
    # Fix ../shared/... -> @shared/... (from gateway/)
    (r"from '\.\./(shared/[^']+)'", r"from '@\1'"),
    # Fix ../database/... -> @database/... (from gateway/)
    (r"from '\.\./(database/[^']+)'", r"from '@\1'"),
    # Fix ../modules/... -> @modules/... (from gateway/)
    (r"from '\.\./(modules/[^']+)'", r"from '@\1'"),
]


def fix_file(filepath):
    """Fix imports in a single file"""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original_content = content

    for pattern, replacement in REPLACEMENTS:
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        return True, content
    return False, content


def main():
    dry_run = "--dry-run" in sys.argv

    if dry_run:
        print("Dry run mode - no changes will be made")
        print()

    files_to_fix = []

    # Find all TypeScript files
    for root, dirs, files in os.walk(SRC_DIR):
        for filename in files:
            if filename.endswith(".ts"):
                filepath = os.path.join(root, filename)
                should_fix, _ = fix_file(filepath)
                if should_fix:
                    files_to_fix.append(filepath)

    print(f"Fixing imports in {SRC_DIR}...")
    print()

    for filepath in files_to_fix:
        if dry_run:
            print(f"Would fix: {filepath}")
        else:
            should_fix, new_content = fix_file(filepath)
            if should_fix:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Fixed: {filepath}")

    print()
    print("Summary:")
    print(f"   Files to fix: {len(files_to_fix)}")

    if dry_run:
        print()
        print("Run without --dry-run to apply changes")


if __name__ == "__main__":
    main()
