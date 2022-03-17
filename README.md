<h1 align="center">Welcome to log-parser-cli 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Log parser CLI that filters all the log messages with the logLevel specified and generates an output log file in a readable format


## Prerequisites
* npm >= 7.24.0
* node >= 16.10.0

## Install

```sh
npm install
```

## Usage

```sh
# You can use the defined script to run the log parser, this will show you a set of questions in the CLI
npm run parse-log

# You can run the CLI parser by providing the options
npm run parse-log -- --input ./app.log --output error-log.json --logLevel error

```

## Example when you run parse-log with no options
![Alt text](img/questions-inquirer.png?raw=true "Questions Parse Log")

## Help section

If you want to know the purpose of each option and what values they expect you can run the following command
```sh
npm run help
```

## Run tests

```sh
npm run test
npm run test:integration
```

## Author

👤 **Moises Trigueros**


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
