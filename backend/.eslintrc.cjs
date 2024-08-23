/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    "prettier/prettier": "error", // Treat Prettier issues as errors
    "semi": [2, "always"], // Enforce semicolons at the end of statements
    "quotes": ['error', 'single', { 'avoidEscape': true }], // Enforce single quotes, but allow double quotes to avoid escaping
    "indent": [2, 2, { "SwitchCase": 1 }], // 2 spaces for indentation, with 1 additional level for switch cases
    "no-trailing-spaces": 2, // Disallow trailing whitespace at the end of lines
    "eol-last": 2, // Enforce a newline at the end of files
    "no-multiple-empty-lines": [2, { "max": 1 }], // Disallow multiple empty lines
    "brace-style": [2, "1tbs"], // Enforce one true brace style for block statements
    "comma-dangle": [2, "always-multiline"], // Enforce trailing commas in multiline object literals
    "no-console": 1, // Warn when console statements are used
    "curly": [2, "all"], // Require curly braces for all control statements
    "eqeqeq": [2, "always"], // Enforce the use of === and !==
    "no-var": 2, // Disallow the use of var, use let or const instead
    "prefer-const": 2, // Prefer const over let for variables that are never reassigned
    "arrow-spacing": [2, { "before": true, "after": true }], // Enforce consistent spacing before and after the arrow in arrow functions
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Disallow unused variables
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }], // Enforce consistent spacing between keys and values in object literals
    "keyword-spacing": [2, { "before": true, "after": true }], // Enforce consistent spacing before and after keywords
    "space-infix-ops": 2, // Require spaces around infix operators
    "no-mixed-spaces-and-tabs": 2, // Disallow mixed spaces and tabs for indentation
    "space-before-blocks": [2, "always"], // Enforce a space before blocks
    "spaced-comment": [2, "always"], // Enforce consistent spacing after the // or /* in a comment
    "space-in-parens": [2, "never"], // Disallow spaces inside parentheses
    "object-curly-spacing": [2, "always"], // Enforce consistent spacing inside braces of object literals
    "array-bracket-spacing": [2, "never"], // Disallow spaces inside brackets of array literals
    "comma-spacing": [2, { "before": false, "after": true }], // Enforce consistent spacing before and after commas
    "func-call-spacing": [2, "never"], // Disallow spacing between function identifiers and their invocations
    "no-multi-spaces": 2, // Disallow multiple spaces
    "block-spacing": [2, "always"], // Enforce consistent spacing inside single-line blocks
    "newline-per-chained-call": [2, { "ignoreChainWithDepth": 2 }], // Enforce newlines between chained method calls up to a specified depth
    "padded-blocks": [2, "never"], // Disallow padding within blocks
    "template-curly-spacing": [2, "never"], // Disallow spaces inside curly braces in template strings

    // Prefer destructuring
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: { array: true, object: true },
        AssignmentExpression: { array: true, object: true }
      },
      { enforceForRenamedProperties: false }
    ],
    "object-shorthand": ["error", "always"], // Require object shorthand syntax
  }
};
