import { parseArgs } from "jsr:@std/cli@1.0.4";

const getInputRepo = (input: (string | number)[]) => {
  if (input.length !== 1) {
    console.error("Usage: main.ts <repo>");
    Deno.exit(1);
  }
  return input[0].toString().trim();
};

const main = async () => {
  const ghListCmd = new Deno.Command("gh", {
    args: [
      "repo",
      "list",
      "--json",
      "name",
      "--jq",
      ".[].name",
      "-L",
      "10000",
    ],
  });

  const { stdout } = await ghListCmd.output();
  const repos = new TextDecoder().decode(stdout).split("\n").filter(Boolean);

  const flags = parseArgs(Deno.args, {});

  const inputRepo = getInputRepo(flags._);
  if (repos.includes(inputRepo)) {
    const ghCloneCmd = new Deno.Command("gh", {
      args: [
        "repo",
        "clone",
        inputRepo,
      ],
    });
    const { code } = await ghCloneCmd.output();
    Deno.exit(code);
  }
};

if (import.meta.main) {
  await main();
}
