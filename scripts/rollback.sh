#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKUP_DIR="$PROJECT_ROOT/.backups"

DRY_RUN=false
PHASE="all"

usage() {
    echo "Usage: $0 [--dry-run] [--phase=phase1|phase2|phase3|all]"
    echo ""
    echo "Options:"
    echo "  --dry-run    Show what would be restored without making changes"
    echo "  --phase      Specify which phase to rollback (default: all)"
    echo ""
    echo "Examples:"
    echo "  $0                        # Rollback all changes"
    echo "  $0 --dry-run             # Preview rollback without changes"
    echo "  $0 --phase=phase1        # Rollback only phase 1"
    echo "  $0 --phase=phase2        # Rollback only phase 2"
}

for arg in "$@"; do
    case $arg in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --phase=*)
            PHASE="${arg#*=}"
            shift
            ;;
        --help|-h)
            usage
            exit 0
            ;;
    esac
done

log() {
    local prefix=""
    if [ "$DRY_RUN" = true ]; then
        prefix="[DRY-RUN] "
    fi
    echo "${prefix}[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log_error() {
    log "ERROR: $1" >&2
}

log_success() {
    log "SUCCESS: $1"
}

log_warning() {
    log "WARNING: $1"
}

echo "========================================"
echo "        Rollback Script                "
echo "========================================"
echo "Mode: $([ "$DRY_RUN" = true ] && echo 'DRY-RUN' || echo 'LIVE')"
echo "Phase: $PHASE"
echo "========================================"
echo ""

if [ ! -d "$BACKUP_DIR" ]; then
    log_warning "No backups found in $BACKUP_DIR"
    exit 0
fi

rollback_phase() {
    local phase_name="$1"
    local phase_backup="$BACKUP_DIR/$phase_name"
    
    if [ ! -d "$phase_backup" ]; then
        log_warning "No backup found for phase: $phase_name"
        return 0
    fi
    
    log "Rolling back phase: $phase_name"
    
    local files_restored=0
    local files_removed=0
    
    while IFS= read -r -d '' file; do
        local relative="${file#$phase_backup/}"
        local original="$phase_backup/$relative"
        local current="$PROJECT_ROOT/$relative"
        
        if [ -f "$original" ]; then
            if [ "$DRY_RUN" = true ]; then
                log "Would restore: $relative"
            else
                local parent_dir=$(dirname "$current")
                if [ ! -d "$parent_dir" ]; then
                    mkdir -p "$parent_dir"
                fi
                cp "$original" "$current"
                log_success "Restored: $relative"
            fi
            ((files_restored++))
        fi
    done < <(find "$phase_backup" -type f -print0 2>/dev/null || true)
    
    log "Phase $phase_name rollback: $files_restored files restored"
}

rollback_renamed_files() {
    log "Checking for renamed files to remove..."
    
    local rename_map="$SCRIPT_DIR/rename-map.json"
    
    if [ ! -f "$rename_map" ]; then
        log_warning "rename-map.json not found, skipping renamed file cleanup"
        return
    fi
    
    if [ "$DRY_RUN" = true ]; then
        log "Would check and remove renamed files"
        return
    fi
    
    if command -v node &> /dev/null && [ -f "$rename_map" ]; then
        local renames=$(node -e "
            const fs = require('fs');
            const map = JSON.parse(fs.readFileSync('$rename_map', 'utf-8'));
            const r = map.renames || map;
            Object.values(r).forEach(f => console.log(f));
        " 2>/dev/null || echo "")
        
        for newFile in $renames; do
            if [ -f "$PROJECT_ROOT/$newFile" ]; then
                log "Would remove renamed file: $newFile"
            fi
        done
    fi
}

case "$PHASE" in
    all)
        if [ -d "$BACKUP_DIR/phase3-imports" ]; then
            rollback_phase "phase3-imports"
        fi
        if [ -d "$BACKUP_DIR/phase2-barrel" ]; then
            rollback_phase "phase2-barrel"
        fi
        if [ -d "$BACKUP_DIR/phase1-rename" ]; then
            rollback_phase "phase1-rename"
        fi
        ;;
    phase1|phase2|phase3)
        rollback_phase "$PHASE"
        ;;
    rename|barrel|imports)
        rollback_phase "phase1-$PHASE" 2>/dev/null || rollback_phase "phase-$PHASE" 2>/dev/null || rollback_phase "$PHASE"
        ;;
    *)
        log_error "Unknown phase: $PHASE"
        exit 1
        ;;
esac

if [ "$DRY_RUN" = false ]; then
    log "Rollback complete!"
else
    log "Dry run complete - no changes made"
fi

echo ""
echo "========================================"
