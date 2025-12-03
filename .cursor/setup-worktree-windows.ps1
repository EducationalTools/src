$ErrorActionPreference = 'Stop'

# Install dependencies
bun install

# Copy environment file
Copy-Item "$env:ROOT_WORKTREE_PATH\.env.local" .env.local

Write-Host "Worktree setup complete!"