const github = require("@actions/github");
const { spawn } = require("child_process");

function addCommit(commitMsg) {
  const gitCommit = spawn("git", ["commit", "-m", commitMsg]);

  gitCommit.stdout.on("data", (data) => console.log(`adding commit: ${data}`));
  gitCommit.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitCommit.on("close", (code) =>
    console.log(`process exited with code: ${code}`)
  );
}

function configureGit(actor) {
  const gitConfigEmail = spawn("git", [
    "config",
    "--local",
    "user.email",
    `${actor}@github.com`,
  ]);
  const gitConfigUser = spawn("git", ["config", "--local", "user.name", actor]);

  gitConfigEmail.stdout.on("data", (data) =>
    console.log(`addign user email: ${data}`)
  );
  gitConfigEmail.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitConfigEmail.on("close", (code) =>
    console.log(`process exited with code: ${code}`)
  );

  gitConfigUser.stdout.on("data", (data) =>
    console.log(`addign user name: ${data}`)
  );
  gitConfigUser.stderr.on("data", (data) => console.log(`Error: ${data}`));
  gitConfigUser.on("close", (code) =>
    console.log(`process exited with code: ${code}`)
  );
}

function addFile(filename, contents) {}

function gitPush() {}

async function run() {
  try {
    configureGit(github.context.actor);
  } catch (error) {
    console.log(error);
  }
}

run();
