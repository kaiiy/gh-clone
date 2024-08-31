import { parseArgs } from "jsr:@std/cli@1.0.4";
import { render } from "npm:ink@5.0.1";
import React from "npm:react@17.0.2";
import { ghClone, ghList } from "./cmd.ts";
import SelectRepo from "./SelectRepo.tsx";
import { brightBlue } from "jsr:@std/fmt/colors";

const VERSION = "0.1.1";

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

const main = async () => {
  const flags = parseArgs(Deno.args, {
    boolean: ["version", "help"],
    string: ["user"],
    alias: {
      u: "user",
      v: "version",
      V: "version",
      h: "help",
    },
  });

  if (flags.version) {
    console.log(VERSION);
    Deno.exit(0);
  }

  if (flags.help) {
    console.log(`Usage: gh-clone [options] [repository]

Options:
-u, --user <user>   List repositories of the specified user
-v, --version       Show version
-h, --help          Show help`);
    Deno.exit(0);
  }

  // リポジトリ候補
  const repos = await ghList(flags.user);

  // ユーザが入力したリポジトリ名
  const inputRepo = extractInputRepo(flags._);

  // 部分一致
  const matchedRepos = partialMatch(repos, inputRepo);
  // 部分一致が1個だけ
  if (matchedRepos.length === 1) {
    await ghClone(matchedRepos[0]);
  } else if (matchedRepos.length > 1) {
    console.log(brightBlue("- Select a repository to clone"));
    render(<SelectRepo repos={matchedRepos} />);
  } else {
    console.error("No repositories found");
    Deno.exit(1);
  }
};

if (import.meta.main) {
  await main();
}
