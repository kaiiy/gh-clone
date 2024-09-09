# gh clone

gh-clone is a wrapper for the gh clone command, allowing us to search for and clone repositories interactively.

## Requirements

- [gh](https://github.com/cli/cli)

## Installation

```sh
brew install kaiiy/tap/gh-clone
```

## Usage

```sh
Usage: gh-clone [options] [repository]

Options:
-u, --user <user>   Set the specified user
-v, --version       Show version
-h, --help          Show help
```

## Examples

```sh
# Example 1: Clone a repository from the current user
gh-clone gh-clone

# Example 2: Clone a repository from a specified user
gh-clone -u kaiiy gh-clone

# Example 3: List all repositories of a specified user
gh-clone -u kaiiy

# Example 4: List repositories with names that partially match the input
gh-clone gh
```

