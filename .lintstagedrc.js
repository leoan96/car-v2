// .lintstagedrc.js
module.exports = {
  // If any ts/js(x) files changed.
  '{src,apps,libs,test}/**/*.ts': [
    // Execute tests related to the staged files.
    'npm run test -- --passWithNoTests --bail --findRelatedTests',

    // Run eslint --fix
    'npm run lint',

    // Run the typechecker.
    // Anonymous function means: "Do not pass args to the command."
    //   () => 'tsc --noEmit',
  ],
};
