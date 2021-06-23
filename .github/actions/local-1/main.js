const github = require("@actions/github");
const { spawnSync } = require("child_process");
const fs = require("fs-extra");
const workspace = process.env.GITHUB_WORKSPACE;

async function addCommit(commitMsg) {
  const gitCommit = spawnSync("git", ["commit", "-m", commitMsg]);

  if (gitCommit.status !== 0) {
    console.log(`process exited with code: ${gitCommit.status}`);
  }
}

async function configureGit(actor) {
  const gitConfigEmail = spawnSync("git", [
    "config",
    "--local",
    "user.email",
    `${actor}@github.com`,
  ]);
  const gitConfigUser = spawnSync("git", [
    "config",
    "--local",
    "user.name",
    actor,
  ]);
}

async function addFile(filename, contents) {
  console.log(`writing file: ${filename}`);
  await fs.writeFileSync(filename, contents, "utf8");

  const gitAdd = spawnSync("git", ["add", filename]);

  if (gitAdd.status !== 0) {
    console.log(`process failed and exited with code: ${code}`);
  }
}

async function createCommit(filename, contents, msg) {
  await addFile(`${workspace}/${filename}`, contents);
  await addCommit(msg);
}

function gitPush() {}

async function run() {
  try {
    await configureGit(github.context.actor);
    await createCommit(
      "file13.txt",
      "some file contents to fill with",
      "adding file13.txt"
    );

    await createCommit(
      "file1000000.txt",
      "oranges and bananas",
      "adding file10000000.txt"
    );
  } catch (error) {
    console.log(error);
  }
}

run();
