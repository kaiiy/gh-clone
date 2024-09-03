import { brightGreen } from "jsr:@std/fmt/colors";

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

const ghClone = async (repo: string) => {
    const ghCloneCmd = new Deno.Command("gh", {
        args: [
            "repo",
            "clone",
            repo,
        ],
        stdout: "piped",
        stderr: "piped",
    });
    const process = ghCloneCmd.spawn();
    console.log(brightGreen("- gh repo clone " + repo));
    process.stdout.pipeTo(Deno.stdout.writable);
    process.stderr.pipeTo(Deno.stderr.writable);

    const { code } = await process.status;
    Deno.exit(code);
};

export { ghClone, ghList };
