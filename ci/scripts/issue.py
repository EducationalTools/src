import argparse, requests

parser = argparse.ArgumentParser(description='Process issue')
parser.add_argument('-n', '--number', type=int, help='Issue number')
parser.add_argument('-t', '--token', type=str, help='GitHub token')
args = parser.parse_args()

print("Token:", args.token)
request = requests.post("https://api.github.com/orgs/EducationalTools/installation", headers={"Accept": "application/vnd.github+json", "Authorization": f"token {args.token}", "X-GitHub-Api-Version": "2022-11-28"})

print(request.text)
