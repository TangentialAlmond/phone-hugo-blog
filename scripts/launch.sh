#!/bin/bash

# Move to root
cd "$(dirname "$0")/.."

# 1. Platform Detection
PLATFORM=$(uname -o 2>/dev/null || uname -s)
echo "🔍 Detected Platform: $PLATFORM"

# 2. Run the Universal Build
npm run prod
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check your tests."
    exit 1
fi

# 3. Launch Logic
if [[ "$PLATFORM" == *"Android"* ]]; then
    echo "📱 Starting Cloudflare Tunnel (Mate 20 Mode)..."
    hugo server --watch=false --appendPort=false --bind 127.0.0.1 --port 1313 > ~/hugo.log 2>&1 &
    cloudflared tunnel run --protocol http2
else
    echo "💻 Starting Local Dev Server (Mac Mode)..."
    hugo server -D
fi