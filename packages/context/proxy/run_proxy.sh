#!/bin/bash
# Qdrant Proxy Manager
# Manages the port proxy for OpenCode memory tools

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROXY_SCRIPT="$SCRIPT_DIR/qdrant_proxy.py"
LOG_FILE="$SCRIPT_DIR/proxy.log"

start_proxy() {
    if pgrep -f "qdrant_proxy.py" > /dev/null; then
        echo "Proxy is already running"
        return 1
    fi
    echo "Starting Qdrant proxy..."
    python3 "$PROXY_SCRIPT" >> "$LOG_FILE" 2>&1 &
    echo $! > "$SCRIPT_DIR/proxy.pid"
    echo "Proxy started (PID: $(cat $SCRIPT_DIR/proxy.pid))"
    sleep 2
    if curl -s http://localhost:6333/collections > /dev/null 2>&1; then
        echo "✓ Proxy is working - port 6333 accessible"
    else
        echo "✗ Proxy failed - port 6333 not accessible"
    fi
}

stop_proxy() {
    if [ -f "$SCRIPT_DIR/proxy.pid" ]; then
        PID=$(cat "$SCRIPT_DIR/proxy.pid")
        if kill "$PID" 2>/dev/null; then
            rm "$SCRIPT_DIR/proxy.pid"
            echo "Proxy stopped"
        else
            echo "Failed to stop proxy"
        fi
    else
        echo "Proxy not running"
    fi
}

status_proxy() {
    if pgrep -f "qdrant_proxy.py" > /dev/null; then
        PID=$(pgrep -f "qdrant_proxy.py")
        echo "Proxy is running (PID: $PID)"
        echo ""
        echo "Testing connection to port 6333..."
        if curl -s http://localhost:6333/collections | head -c 200; then
            echo ""
            echo "✓ Connection successful"
        else
            echo "✗ Connection failed"
        fi
    else
        echo "Proxy is not running"
    fi
}

case "$1" in
    start)
        start_proxy
        ;;
    stop)
        stop_proxy
        ;;
    restart)
        stop_proxy
        sleep 1
        start_proxy
        ;;
    status)
        status_proxy
        ;;
    install)
        echo "To install as systemd service (requires sudo):"
        echo "  sudo cp $SCRIPT_DIR/qdrant-proxy.service /etc/systemd/system/"
        echo "  sudo systemctl daemon-reload"
        echo "  sudo systemctl enable qdrant-proxy"
        echo "  sudo systemctl start qdrant-proxy"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|install}"
        exit 1
        ;;
esac
