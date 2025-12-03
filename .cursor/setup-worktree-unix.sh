#!/bin/bash
set -e

# Install dependencies
bun install

# Copy environment file
cp "$ROOT_WORKTREE_PATH/.env.local" .env.local

echo "Worktree setup complete!"