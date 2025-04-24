import argparse

parser = argparse.ArgumentParser(description='Process issue number')
parser.add_argument('-n', '--number', type=int, help='Issue number')
args = parser.parse_args()

print(f"Issue number: {args.number}")
