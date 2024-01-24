import requests
import json


def get_github_data(username):
    followers_url = f"https://api.github.com/users/{username}/followers"

    # Fetch followers
    followers_response = requests.get(followers_url)
    followers = followers_response.json()

    data = {}

    for follower in followers:
        follower_name = follower["login"]
        repos_url = follower["repos_url"]

        # Fetch repositories of the follower
        repos_response = requests.get(repos_url)
        repos = repos_response.json()

        repo_names = [repo["name"] for repo in repos]
        data[follower_name] = repo_names

    return data


def save_to_json(data, filename):
    with open(filename, "w") as file:
        json.dump(data, file, indent=4)


# Replace 'your_username' with the GitHub username
username = "RajaSubramanian10"

github_data = get_github_data("RajaSubramanian10")
save_to_json(github_data, "github_followers_data.json")
