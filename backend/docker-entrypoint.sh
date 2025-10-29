#!/bin/sh
set -e

# Run alembic migrations before starting the app (use top-level alembic.ini)
echo "Running database migrations..."
# Ensure the app package is importable by Alembic and the app code
export PYTHONPATH=/app
# The alembic ini is copied to /alembic.ini in the image and is expected to be present in the backend container.
alembic -c /alembic.ini upgrade head || true

exec "$@"
