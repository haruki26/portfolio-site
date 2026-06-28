FROM debian:12-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl ca-certificates build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /mise /pnpm_store

ENV MISE_DATA_DIR=/mise \
    MISE_CONFIG_DIR=/mise \
    MISE_CACHE_DIR=/mise/cache \
    MISE_INSTALL_PATH=/usr/local/bin/mise \
    PATH=/mise/shims:$PATH

# Install mise as root so it can write to /usr/local/bin
RUN curl https://mise.run | sh
COPY mise.toml mise.toml

RUN mise trust && mise i

RUN pnpm config set store-dir /pnpm_store

WORKDIR /workspace

ENV NODE_ENV=development

EXPOSE 3000
