const extractInputRepo = (input: (string | number)[]) => {
    if (input.length !== 1) {
        return undefined;
    }
    return input[0].toString().trim();
};

// 部分一致
const partialMatch = (
    repos: string[],
    inputRepo: string | undefined,
): string[] => {
    if (inputRepo === undefined) {
        return repos;
    }

    const matchedRepos = repos.filter((repo) => repo.includes(inputRepo));
    return matchedRepos;
};

const accurateRepo = (user: string | undefined, repo: string) => {
    if (user === undefined) {
        return repo;
    }

    const repoName = `${user}/${repo}`;
    return repoName;
};

export { accurateRepo, extractInputRepo, partialMatch };
