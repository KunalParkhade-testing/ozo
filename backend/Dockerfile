FROM python:3.11-slim AS builder

# Install build deps
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp/build

# Copy and install Python dependencies into a target directory
COPY requirements.txt .
RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip install --prefix=/install -r requirements.txt


FROM python:3.11-slim

# Runtime deps (kept minimal)
RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
ENV APP_USER=appuser
RUN useradd --create-home --shell /bin/bash $APP_USER

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Create app directory and set ownership
WORKDIR /app
COPY ./app ./app
RUN chown -R $APP_USER:$APP_USER /app

# Copy entrypoint into a location not shadowed by a mounted /app
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && chown root:root /usr/local/bin/docker-entrypoint.sh

# Copy alembic.ini into the image so migrations config is available even if /app is bind-mounted
COPY ./alembic.ini /alembic.ini

USER $APP_USER

# Expose server port
EXPOSE 8000

# Default command (in dev overrides we'll enable --reload)
ENTRYPOINT ["/bin/sh", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]