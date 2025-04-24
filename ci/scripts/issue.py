import argparse, requests

parser = argparse.ArgumentParser(description='Process issue')
parser.add_argument('-n', '--number', type=int, help='Issue number')
parser.add_argument('-t', '--token', type=str, help='GitHub token')
args = parser.parse_args()

if args.number:
    issue_request = requests.get(
        f"https://api.github.com/repos/EducationalTools/src/issues/{args.number}",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {args.token}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
    )

    if issue_request.status_code == 200:
        comment_request = requests.post(
            f"https://api.github.com/repos/EducationalTools/src/issues/{args.number}/comments",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {args.token}",
                "X-GitHub-Api-Version": "2022-11-28"
            },
            json={"body": "title: " + issue_request.json()["title"]}
        )
        if comment_request.status_code == 201:
            print("Comment added successfully")
        else:
            print(f"Failed to add comment: {comment_request.status_code}")
    else:
        print(f"Failed to get issue: {issue_request.status_code}")

    print(f"Issue {args.number} details:")
    print(issue_request.json())
