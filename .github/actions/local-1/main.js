const github = require("@actions/github");
const { spawn } = require("child_process");
const fs = require("fs-extra");
const workspace = process.env.GITHUB_WORKSPACE;

async function addCommit(commitMsg) {
  const gitCommit = spawn("git", ["commit", "-m", commitMsg]);

  gitCommit.stdout.on("data", (data) => console.log(`adding commit: ${data}`));
  gitCommit.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitCommit.on("close", (code) => {
    if (code !== 0) {
      console.log(`process failed and exited with code: ${code}`);
    }
    console.log(`Commit successfully made`);
  });
}

async function configureGit(actor) {
  const gitConfigEmail = spawn("git", [
    "config",
    "--local",
    "user.email",
    `${actor}@github.com`,
  ]);
  const gitConfigUser = spawn("git", ["config", "--local", "user.name", actor]);

  gitConfigEmail.stdout.on("data", (data) =>
    console.log(`adding user email: ${data}`)
  );
  gitConfigEmail.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitConfigEmail.on("close", (code) => {
    if (code !== 0) {
      console.log(`process failed and exited with code: ${code}`);
    }
    console.log(`Git user email has been successfully configured`);
  });

  gitConfigUser.stdout.on("data", (data) =>
    console.log(`adding user name: ${data}`)
  );
  gitConfigUser.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitConfigUser.on("close", (code) => {
    if (code !== 0) {
      console.log(`process failed and exited with code: ${code}`);
    }
    console.log(`Git user name has been successfully configured`);
  });
}

async function addFile(filename, contents) {
  console.log(`writing file: ${filename}`);
  fs.writeFileSync(filename, contents, "utf8");

  const gitAdd = spawn("git", ["add", filename]);
  gitAdd.stdout.on("data", (data) => console.log(`adding file: ${data}`));
  gitAdd.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitAdd.on("close", (code) => {
    if (code !== 0) {
      console.log(`process failed and exited with code: ${code}`);
    }
    console.log(`${filename} has been successfully staged for commit`);
  });
}

function gitPush() {}

async function run() {
  try {
    await configureGit(github.context.actor);
    await addFile(
      `${workspace}/file1.txt`,
      "Adding some content to a file to create a commit"
    );
    await addCommit("committing file 1.txt");
  } catch (error) {
    console.log(error);
  }
}

run();
