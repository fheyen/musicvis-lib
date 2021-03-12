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
      1. [Structure and Dependencies](#structure-and-dependencies)
      2. [TODO](#todo)

## Testing

Using Jest.

- `npm test` for complete test and coverage
- `npm run testch` for a test of only the changed files or test

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

### Structure and Dependencies

In VSCode you can generate a dependcy graph via [a plugin](https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser).

### TODO

- Add
  - Benchmarks and tests for matching, alignment, and comparison algorithms
  - FOGSAA algorithm for string matching / distance
    - [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3638164/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3638164/)
    - [https://github.com/kjenova/fogsaa](https://github.com/kjenova/fogsaa)
- Improve
  - Parsing of MIDI and MusicXML
    - Add type/PitchBend.js
