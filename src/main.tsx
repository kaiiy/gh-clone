import { ghClone, ghList } from "./cmd.ts";
import SelectRepo from "./SelectRepo.tsx";
import { extractInputRepo, partialMatch } from "./lib.ts";
import { cli, colors, ink, React } from "./deps.ts";

const VERSION = "0.1.6";

const main = async () => {
  const flags = cli.parseArgs(Deno.args, {
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
-u, --user <user>   Set the specified user
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
    await ghClone(flags.user, matchedRepos[0]);
  } else if (matchedRepos.length > 1) {
    console.log(colors.brightBlue("- Select a repository to clone"));
    ink.render(
      <SelectRepo repos={matchedRepos} user={flags.user} />,
    );

    // カーソルを表示
    const showCursor = new TextEncoder().encode("\x1b[?25h");
    await Deno.stdout.write(showCursor);
  } else {
    console.error("No repositories found");
    Deno.exit(1);
  }
};

if (import.meta.main) {
  await main();
}
