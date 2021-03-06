const core = require("@actions/core");

const gradeLearner = require("./lib/gradeLearner");

async function run() {
  try {
    const results = await gradeLearner();
    // core.setOutput("reports", results);
    core.info(results);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
