import { accurateRepo } from "./lib.ts";
import { colors } from "./deps.ts";

const ghList = async (user: string | undefined) => {
  const ghListCmd = new Deno.Command("gh", {
    args: [
      "repo",
      "list",
      user !== undefined ? user : "",
      "--json",
      "name",
      "--jq",
      ".[].name",
      "-L",
      "10000",
    ].filter(Boolean),
  });

  const { code, stdout } = await ghListCmd.output();
  if (code !== 0) {
    console.error("Failed to list repositories");
    Deno.exit(1);
  }
  const repos = new TextDecoder().decode(stdout).split("\n").filter(Boolean);
  return repos;
};

const ghClone = async (user: string | undefined, repo: string) => {
  const repoName = accurateRepo(user, repo);
  const ghCloneCmd = new Deno.Command("gh", {
    args: [
      "repo",
      "clone",
      repoName,
    ],
    stdout: "piped",
    stderr: "piped",
  });
  const process = ghCloneCmd.spawn();
  console.log(colors.brightGreen("- gh repo clone " + repoName));
  process.stdout.pipeTo(Deno.stdout.writable);
  process.stderr.pipeTo(Deno.stderr.writable);

  const { code } = await process.status;
  return code;
};

export { ghClone, ghList };
