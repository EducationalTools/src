import argparse, requests

parser = argparse.ArgumentParser(description='Process issue')
parser.add_argument('-n', '--number', type=int, help='Issue number')
parser.add_argument('-t', '--token', type=str, help='GitHub token')
args = parser.parse_args()

def issue_comment(body):
    comment_request = requests.post(
        f"https://api.github.com/repos/EducationalTools/src/issues/{args.number}/comments",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {args.token}",
            "X-GitHub-Api-Version": "2022-11-28"
        },
        json={"body": body}
    )
    return comment_request

issue_request = requests.get(
    f"https://api.github.com/repos/EducationalTools/src/issues/{args.number}",
    headers={
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {args.token}",
        "X-GitHub-Api-Version": "2022-11-28"
    }
)

if not issue_request.status_code == 200:
    print(f"Issue {args.number} not found")
    exit(1)

if issue_request.json()["title"].startswith("[Gmae Request] "):
    issue_comment("this is a gmae request")
