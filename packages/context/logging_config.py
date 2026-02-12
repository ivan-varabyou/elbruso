"""
Logging configuration for Elbruso Context MCP Server.
Supports configurable log level via environment variable.
"""

import logging
import os
import sys


def setup_logging() -> logging.Logger:
    """
    Настройка логирования с поддержкой уровня через ENV.

    ENV variables:
    - LOG_LEVEL: DEBUG, INFO, WARNING, ERROR (default: ERROR)
    """
    level_name = os.getenv("LOG_LEVEL", "ERROR").upper()
    level = getattr(logging, level_name, logging.ERROR)

    logger = logging.getLogger("elbruso-context")
    logger.setLevel(level)

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(level)
    formatter = logging.Formatter("%(name)s: %(levelname)s - %(message)s")
    handler.setFormatter(formatter)

    logger.handlers = []
    logger.addHandler(handler)

    logging.getLogger("transformers").setLevel(logging.ERROR)
    logging.getLogger("qdrant_client").setLevel(logging.ERROR)
    logging.getLogger("httpx").setLevel(logging.ERROR)
    logging.getLogger("torch").setLevel(logging.ERROR)
    logging.getLogger("sentence_transformers").setLevel(logging.ERROR)

    return logger
