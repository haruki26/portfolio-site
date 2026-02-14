FROM debian:12-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl ca-certificates git build-essential \
    && rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ENV MISE_DATA_DIR=/mise \
    MISE_CONFIG_DIR=/mise \
    MISE_CACHE_DIR=/mise/cache \
    MISE_INSTALL_PATH=/usr/local/bin/mise \
    PATH=/mise/shims:$PATH

RUN curl https://mise.run | sh

WORKDIR /app

# 依存だけ先に
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY mise.toml ./

RUN mise trust && mise i
RUN pnpm i

EXPOSE 3000

CMD ["pnpm", "dev", "--host"]
