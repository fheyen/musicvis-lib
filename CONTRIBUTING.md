# Contribution

Feel free to reach out to me if you have ideas!

For concrete changes please use pull requests.

For ideas, hints, or if you just don't have time or resources to do pull requests, create an [issue](https://github.com/fheyen/musicvis-lib/issues).

1. [Contribution](#contribution)
   1. [Testing](#testing)
   2. [Linting](#linting)
   3. [Building](#building)
   4. [Documentation](#documentation)
   5. [Deployment](#deployment)
   6. [More](#more)
      1. [Structure and Internal Dependencies](#structure-and-internal-dependencies)

## Testing

Using Jest.

- `npm test` for complete test and coverage
- `npm run testch` for a test of only the changed files or test
- `npx jest -t 'my test'` runs a single test

## Linting

`npm run lint`

- JavaScript
  - Using [eslint](https://eslint.org/)
  - For jsDoc see [here](https://github.com/gajus/eslint-plugin-jsdoc)
  - See [.eslintrc.js](./.eslintrc.js)
- Markdown
  - Using [remark-link](https://github.com/remarkjs/remark-lint)
  - See [.remarkrc.json](./.remarkrc.json)

## Building

`npm run build`

Using webpack, see [webpack.dev.js](./webpack.dev.js) and [webpack.prod.js](./webpack.prod.js)

Using [source-map-loader](https://github.com/webpack-contrib/source-map-loader)

## Documentation

`npm run doc`

Using jsDoc, see [jsdoc.conf.json](./jsdoc.conf.json)

## Deployment

Test, lint, build, and generate docs with `npm run predeploy`.

Create a new version with `npm version major|minor|patch` (follow semantic versioning!).

Run `npm run deploy` (will first run `predeploy`) to also create a tag and commit to GitHub and then publish to npm.

## More

### Structure and Internal Dependencies

In VSCode you can generate a dependcy graph via [a plugin](https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser).
