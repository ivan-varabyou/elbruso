#!/usr/bin/env python3
"""
Qdrant Port Proxy
Forwards connections from port 6333 to 7999
Allows OpenCode memory_memory_* tools to access Qdrant on 7999
"""

import asyncio
import socket
import logging
import signal
import sys
from typing import Optional

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

LISTEN_HOST = "127.0.0.1"
LISTEN_PORT = 6333
TARGET_HOST = "127.0.0.1"
TARGET_PORT = 7999


class QdrantProxy:
    def __init__(self):
        self.server: Optional[asyncio.Server] = None
        self.running = False

    async def handle_client(
        self, client_reader: asyncio.StreamReader, client_writer: asyncio.StreamWriter
    ):
        """Handle a single client connection - forward to target."""
        addr = client_writer.get_extra_info("peername")
        logger.info(f"Client connected from {addr}")

        try:
            target_reader, target_writer = await asyncio.open_connection(
                TARGET_HOST, TARGET_PORT
            )
            logger.info(f"Connected to Qdrant at {TARGET_HOST}:{TARGET_PORT}")

            async def forward(
                source: asyncio.StreamReader, destination: asyncio.StreamWriter
            ):
                """Forward data from source to destination."""
                try:
                    while True:
                        data = await source.read(8192)
                        if not data:
                            break
                        destination.write(data)
                        await destination.drain()
                except Exception as e:
                    logger.error(f"Forward error: {e}")
                finally:
                    destination.close()

            await asyncio.gather(
                forward(client_reader, target_writer),
                forward(target_reader, client_writer),
            )

        except ConnectionRefusedError:
            logger.error(f"Cannot connect to Qdrant at {TARGET_HOST}:{TARGET_PORT}")
        except Exception as e:
            logger.error(f"Client handler error: {e}")
        finally:
            client_writer.close()
            await client_writer.wait_closed()
            logger.info(f"Client disconnected from {addr}")

    async def start(self):
        """Start the proxy server."""
        self.server = await asyncio.start_server(
            self.handle_client, LISTEN_HOST, LISTEN_PORT, reuse_address=True
        )

        addr = self.server.sockets[0].getsockname()
        logger.info(f"Qdrant Proxy started")
        logger.info(f"Listening on {LISTEN_HOST}:{LISTEN_PORT}")
        logger.info(f"Forwarding to {TARGET_HOST}:{TARGET_PORT}")

        self.running = True

        async with self.server:
            await self.server.serve_forever()

    async def stop(self):
        """Stop the proxy server."""
        self.running = False
        if self.server:
            self.server.close()
            await self.server.wait_closed()
            logger.info("Proxy server stopped")


async def main():
    proxy = QdrantProxy()

    def signal_handler():
        logger.info("Received shutdown signal")
        asyncio.create_task(proxy.stop())

    loop = asyncio.get_running_loop()
    for sig in (signal.SIGTERM, signal.SIGINT):
        loop.add_signal_handler(sig, signal_handler)

    await proxy.start()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Interrupted by user")
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)
