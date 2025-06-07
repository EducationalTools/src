# CI/CD Automation Scripts

This directory contains automation scripts for managing GitHub issues and project boards.

## Scripts Overview

### 1. `issue.py` - Issue Management

Automatically processes GitHub issues, particularly game requests:

- Detects issues with `[Gmae Request]` prefix
- Searches for relevant links on GitHub Pages
- Posts automated comments with search results

### 2. `move_to_production.py` - Project Board Automation

Moves project items from "Done" status to "In Production" status:

- Queries GitHub Projects v2 API using GraphQL
- Finds all items with status "Done"
- Updates them to "In Production" status
- Used for production deployment automation

### 3. `test_production_move.py` - Testing Script

Manual testing script for the production move operation:

- Allows testing the move operation without triggering workflows
- Supports dry-run mode (future enhancement)
- Useful for debugging and validation

## GitHub Workflows

### Issue Management (`.github/workflows/issue.yml`)

Triggers on:

- Issue opened
- Issue edited

Actions:

- Runs `issue.py` script
- Posts automated comments for game requests

### Production Deployment (`.github/workflows/production_deploy.yml`)

Triggers on:

- Push to `prod` branch

Actions:

- Runs `move_to_production.py` script
- Moves all "Done" items to "In Production" in project #4

## Setup Requirements

### GitHub App Configuration

Both workflows use a GitHub App for authentication:

1. **Secrets Required:**

   - `GH_APP_ID` - Your GitHub App ID
   - `GH_PRIVATE_KEY` - Your GitHub App private key

2. **App Permissions:**
   - Issues: Read & Write (for issue comments)
   - Projects: Read & Write (for project board updates)
   - Repository: Read (for workflow access)

### Project Configuration

The production deployment script assumes:

- Organization: `EducationalTools`
- Project number: `4`
- Status field with options: "Done" and "In Production"

These can be customized by modifying the workflow or script parameters.

## Usage

### Automatic Usage

The workflows run automatically based on their triggers:

- Issue workflow: When issues are opened/edited
- Production workflow: When code is pushed to `prod` branch

### Manual Testing

To test the production move operation manually:

```bash
# Install dependencies
pip install requests

# Test with your GitHub token
python ci/scripts/test_production_move.py --token YOUR_GITHUB_TOKEN

# Test with different organization/project
python ci/scripts/test_production_move.py \
  --token YOUR_TOKEN \
  --org YourOrganization \
  --project 5
```

### Direct Script Usage

You can also run the scripts directly:

```bash
# Process a specific issue
python ci/scripts/issue.py -n 123 -t YOUR_TOKEN

# Move project items to production
python ci/scripts/move_to_production.py -t YOUR_TOKEN -o EducationalTools -p 4
```

## Dependencies

- `requests` - HTTP client for GitHub API calls
- `googlesearch-python` - For searching game links (issue.py only)

## Error Handling

The scripts include error handling for common scenarios:

- Invalid tokens or permissions
- Missing projects or fields
- Network issues
- GraphQL API errors

## GraphQL Queries

The project automation uses GitHub's GraphQL API v4 for efficient data retrieval and mutations. Key operations:

1. **Project Data Query** - Gets project ID and field information
2. **Items Query** - Retrieves all project items with their status values
3. **Update Mutation** - Changes item status from "Done" to "In Production"

## Future Enhancements

Potential improvements:

- Dry-run mode for testing changes
- Support for custom field names
- Better error reporting and logging
- Slack/Discord notifications
- Rollback capabilities
