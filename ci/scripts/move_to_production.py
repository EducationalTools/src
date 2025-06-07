# Vibecoded because I hate graphql

import argparse
import requests
import json

parser = argparse.ArgumentParser(description='Move project items from Done to In Production')
parser.add_argument('-t', '--token', type=str, help='GitHub token', required=True)
parser.add_argument('-o', '--org', type=str, help='Organization name', default='EducationalTools')
parser.add_argument('-p', '--project', type=int, help='Project number', default=4)
args = parser.parse_args()

def graphql_request(query, variables=None):
    """Make a GraphQL request to GitHub API"""
    headers = {
        "Authorization": f"Bearer {args.token}",
        "Content-Type": "application/json"
    }

    data = {"query": query}
    if variables:
        data["variables"] = variables

    response = requests.post("https://api.github.com/graphql",
                           headers=headers,
                           json=data)

    if response.status_code != 200:
        print(f"GraphQL request failed: {response.status_code}")
        print(response.text)
        exit(1)

    return response.json()

def get_project_data():
    """Get project ID and field information"""
    print(f"Getting project data for {args.org} project #{args.project}")

    query = """
    query($org: String!, $number: Int!) {
      organization(login: $org) {
        projectV2(number: $number) {
          id
          fields(first: 20) {
            nodes {
              ... on ProjectV2Field {
                id
                name
              }
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    """

    variables = {
        "org": args.org,
        "number": args.project
    }

    result = graphql_request(query, variables)

    if not result.get("data", {}).get("organization", {}).get("projectV2"):
        print(f"Project {args.project} not found in organization {args.org}")
        exit(1)

    project_data = result["data"]["organization"]["projectV2"]
    project_id = project_data["id"]

    # Find Status field and its options
    status_field_id = None
    done_option_id = None
    in_production_option_id = None

    for field in project_data["fields"]["nodes"]:
        if field["name"] == "Status" and "options" in field:
            status_field_id = field["id"]
            for option in field["options"]:
                if option["name"] == "Done":
                    done_option_id = option["id"]
                elif option["name"] == "In Production":
                    in_production_option_id = option["id"]
            break

    if not status_field_id:
        print("Status field not found in project")
        exit(1)

    if not done_option_id:
        print("'Done' status option not found")
        exit(1)

    if not in_production_option_id:
        print("'In Production' status option not found")
        exit(1)

    return {
        "project_id": project_id,
        "status_field_id": status_field_id,
        "done_option_id": done_option_id,
        "in_production_option_id": in_production_option_id
    }

def get_done_items(project_id, status_field_id, done_option_id):
    """Get all items with Status = Done"""
    print("Finding items with status 'Done'")

    query = """
    query($project_id: ID!) {
      node(id: $project_id) {
        ... on ProjectV2 {
          items(first: 100) {
            nodes {
              id
              fieldValues(first: 20) {
                nodes {
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    field {
                      ... on ProjectV2SingleSelectField {
                        id
                        name
                      }
                    }
                    optionId
                  }
                }
              }
            }
          }
        }
      }
    }
    """

    variables = {"project_id": project_id}
    result = graphql_request(query, variables)

    done_items = []
    items = result["data"]["node"]["items"]["nodes"]

    for item in items:
        for field_value in item["fieldValues"]["nodes"]:
            if (field_value.get("field", {}).get("id") == status_field_id and
                field_value.get("optionId") == done_option_id):
                done_items.append(item["id"])
                break

    print(f"Found {len(done_items)} items with status 'Done'")
    return done_items

def update_item_status(project_id, item_id, status_field_id, new_status_option_id):
    """Update a single item's status"""
    query = """
    mutation($project_id: ID!, $item_id: ID!, $field_id: ID!, $option_id: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $project_id
        itemId: $item_id
        fieldId: $field_id
        value: {
          singleSelectOptionId: $option_id
        }
      }) {
        projectV2Item {
          id
        }
      }
    }
    """

    variables = {
        "project_id": project_id,
        "item_id": item_id,
        "field_id": status_field_id,
        "option_id": new_status_option_id
    }

    result = graphql_request(query, variables)
    return result["data"]["updateProjectV2ItemFieldValue"]["projectV2Item"]["id"]

def main():
    # Get project data and field IDs
    project_data = get_project_data()

    # Find all items with status "Done"
    done_items = get_done_items(
        project_data["project_id"],
        project_data["status_field_id"],
        project_data["done_option_id"]
    )

    if not done_items:
        print("No items found with status 'Done'. Nothing to update.")
        return

    # Update each item to "In Production"
    print(f"Updating {len(done_items)} items to 'In Production' status")

    updated_count = 0
    for item_id in done_items:
        try:
            update_item_status(
                project_data["project_id"],
                item_id,
                project_data["status_field_id"],
                project_data["in_production_option_id"]
            )
            updated_count += 1
            print(f"Updated item {item_id}")
        except Exception as e:
            print(f"Failed to update item {item_id}: {e}")

    print(f"Successfully updated {updated_count} items from 'Done' to 'In Production'")

if __name__ == "__main__":
    main()
