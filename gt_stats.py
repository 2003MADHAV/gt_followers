import re
import json
from pprint import pprint


def gt_stats(json_file_path: str):
    json_file = open(json_file_path, "r")
    follower_stats = {}
    follower_interests = []
    follower_data = json.loads(json_file.read())
    for username, repos in zip(follower_data.keys(), follower_data.values()):
        follower_stats[username] = len(repos)
        for repo in repos:
            follower_interests += re.split("-|_", repo)

    f = open("words.json", "w")
    print(json.dumps(follower_interests), file=f)
    f2 = open("repo_count.json", "w")
    print(json.dumps(follower_stats), file=f2)

    # pprint(follower_stats)


gt_stats("github_followers_data.json")
