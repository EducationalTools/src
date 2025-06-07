#!/usr/bin/env python3
"""
Test script to manually run the production move operation.
This can be used to test the functionality before running it in the workflow.

Usage:
    python test_production_move.py --token YOUR_GITHUB_TOKEN

You can also override the organization and project number:
    python test_production_move.py --token YOUR_TOKEN --org YourOrg --project 5
"""

import argparse
import sys
import os

# Add the current directory to the path so we can import move_to_production
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from move_to_production import main as move_main, args as move_args

def test_main():
    parser = argparse.ArgumentParser(description='Test the production move operation')
    parser.add_argument('-t', '--token', type=str, help='GitHub token', required=True)
    parser.add_argument('-o', '--org', type=str, help='Organization name', default='EducationalTools')
    parser.add_argument('-p', '--project', type=int, help='Project number', default=4)
    parser.add_argument('--dry-run', action='store_true', help='Show what would be updated without making changes')
    
    test_args = parser.parse_args()
    
    # Override the global args in move_to_production module
    move_args.token = test_args.token
    move_args.org = test_args.org
    move_args.project = test_args.project
    
    print("=" * 60)
    print("TESTING PRODUCTION MOVE OPERATION")
    print("=" * 60)
    print(f"Organization: {test_args.org}")
    print(f"Project: #{test_args.project}")
    print(f"Dry run: {test_args.dry_run}")
    print("-" * 60)
    
    if test_args.dry_run:
        print("DRY RUN MODE - No actual changes will be made")
        print("-" * 60)
        # TODO: Implement dry run mode in move_to_production.py if needed
    
    try:
        move_main()
        print("-" * 60)
        print("✅ Test completed successfully!")
    except Exception as e:
        print("-" * 60)
        print(f"❌ Test failed with error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    test_main()