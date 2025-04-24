import argparse, requests

parser = argparse.ArgumentParser(description='Process issue')
parser.add_argument('-n', '--number', type=int, help='Issue number')
parser.add_argument('-t', '--token', type=str, help='GitHub token')
args = parser.parse_args()

if args.number:
    issue_request = requests.get(
        f"https://api.github.com/repos/EducationalTools/repo/issues/{args.number}",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {args.token}",
            "X-GitHub-Api-Version": "2022-11-28"
        }
    )

    print(f"Issue {args.number} details:")
    print(issue_request.json())
