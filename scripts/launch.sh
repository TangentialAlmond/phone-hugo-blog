#!/bin/bash

# Move to root
cd "$(dirname "$0")/.."

# 1. Platform Detection
PLATFORM=$(uname -o 2>/dev/null || uname -s)
echo "🔍 Detected Platform: $PLATFORM"

# 2. Clean install dependencies
echo "📦 Install dependencies..."
npm ci

# 3. Run the Universal Build
npm run prod
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check your tests."
    exit 1
fi

# 4. Launch Logic
# Note: Set baseURL as your domain
if [[ "$PLATFORM" == *"Android"* ]]; then
    echo "Anroid mode: Serving the Site and Starting Cloudflare Tunnel..."
    mkdir -p logs
    hugo server --bind 127.0.0.1 \
	    --port 1313 \
        --baseURL="https://example.com" \
        --appendPort=false > logs/hugo.log 2>&1 &
    echo "✅ Hugo is running in the background"
    echo "🔗 Opening CloudFlare tunnel (TCP mode)..."
    cloudflared tunnel run --protocol http2
else
    echo "Laptop mode: Starting Local Dev Server..."
    hugo server -D
fi
