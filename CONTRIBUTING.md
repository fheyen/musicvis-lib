# Contribution

Feel free to reach out to me if you have ideas!

For concrete changes please use pull requests.

For ideas, hints, or if you just don't have time or resources to do pull requests, create an [issue](https://github.com/fheyen/musicvis-lib/issues).

1. [Contribution](#contribution)
   1. [Testing](#testing)
   2. [Linting](#linting)
   3. [Building](#building)
   4. [Pre-Commit Hooks](#pre-commit-hooks)
   5. [Documentation](#documentation)
   6. [Deployment](#deployment)
   7. [More](#more)
      1. [Structure and Internal Dependencies](#structure-and-internal-dependencies)

## Testing

Using Jest.

- `npm test`: complete test and coverage
- `npm run testch`: test only the changed files or tests
- `npm run testfail`: test only the failed cases
- `npx jest -t 'my test'`: run a single test

Includes [jest-extended](https://github.com/jest-community/jest-extended) for more specific matchers.

## Linting

`npm run lint`

Using [standard](https://standardjs.com/)

## Building

`npm run build`

Using [esbuild](https://esbuild.github.io/)

## Pre-Commit Hooks

With [husky](https://typicode.github.io/husky/)

## Documentation

`npm run doc`

Using jsDoc, see [jsdoc.conf.json](./jsdoc.conf.json)

## Deployment

Test, lint, build, and generate docs with `npm run predeploy`.

Create a new version with `npm version major|minor|patch` (follow semantic versioning!).

Run `npm run deploy` (will first run `predeploy`) to also create a tag and commit to GitHub and then publish to npm.

## More

### Structure and Internal Dependencies

You can see a visual dependency graph [here](https://observablehq.com/@mbostock/package-dependencies?name=musicvis-lib@latest).

In VSCode you can generate such a graph via [a plugin](https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser).
