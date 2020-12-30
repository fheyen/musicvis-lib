# Contribution

Feel free to reach out to me if you have ideas!

For concrete changes please use pull requests.

For ideas, hints, or if you just don't have time or resources to do pull requests, create an [issue](https://github.com/fheyen/musicvis-lib/issues).

1. [Contribution](#contribution)
   1. [Testing](#testing)
   2. [Linting](#linting)
   3. [Building](#building)
   4. [Documentation](#documentation)
   5. [More](#more)
      1. [Structure and Dependencies](#structure-and-dependencies)
      2. [TODO](#todo)

## Testing

`npm test`

Using Jest.

## Linting

`npm run lint`

Using [eslint](https://eslint.org/)

For jsDoc see here: https://github.com/gajus/eslint-plugin-jsdoc

## Building

`npm run build`

Using webpack.

## Documentation

`npm run doc`

Using jsDoc.

## More

### Structure and Dependencies

In VSCode you can generate a dependcy graph via [a plugin](https://marketplace.visualstudio.com/items?itemName=juanallo.vscode-dependency-cruiser).

### TODO

- Add
  - type/PitchBend.js
  - FOGSAA algorithm for string matching / distance
    - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3638164/
    - https://github.com/kjenova/fogsaa
