const github = require("@actions/github");
const core = require("@actions/core");

module.exports = async () => {
  const expectedNumberOfCommits = 6;
  //   const commitMessages = res.data.map((c) => c.commit.message);
  const token = core.getInput("token");
  const octokit = github.getOctokit(token);

  try {
    //   Get the commits of the repo
    const res = await octokit.rest.repos.listCommits({
      ...github.context.repo,
    });
    return res.data;
    // count number of commits (should be 6)
    // if 1 less commit then check for messages
    // if more than one then is missing then throw invalid even if the proper commit is missing
    // if no comits are missing then throw invalid as the exercise is incomplete

    // if wrong commit was removed then invalid
    // check to see if removedCommitMessage is missing
    // if missing then good
    // if not missing then bad

    // const removedCommitMessage =
    //   "I know I shouldn't comit secrets, but here we are 🤷";

    // if (answers.includes(doc.on.schedule[0].cron.trim())) {
    //   return {
    //     reports: [
    //       {
    //         filename: filename,
    //         isCorrect: true,
    //         display_type: "actions",
    //         level: "info",
    //         msg: "Great job!  You have successfully configured the stale-weekly workflow file.",
    //         error: {
    //           expected: "",
    //           got: "",
    //         },
    //       },
    //     ],
    //   };
    // } else {
    //   return {
    //     reports: [
    //       {
    //         filename: filename,
    //         isCorrect: false,
    //         display_type: "actions",
    //         level: "warning",
    //         msg: `incorrect solution`,
    //         error: {
    //           expected: "0 0 * * MON or 0 0 * * 1",
    //           got: `${doc.on.schedule[0].cron.trim()}`,
    //         },
    //       },
    //     ],
    //   };
    // }
  } catch (error) {
    return error;
    // return {
    //   reports: [
    //     {
    //       filename: filename,
    //       isCorrect: false,
    //       display_type: "actions",
    //       level: "fatal",
    //       msg: "",
    //       error: {
    //         expected: "",
    //         got: "An internal error occurred.  Please open an issue at: https://github.com/githubtraining/lab-scheduled-events and let us know!  Thank you",
    //       },
    //     },
    //   ],
    // };
  }
};
