import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { LogLevel } from 'src/types/enums/log-level';
import { parseInputLogFile } from 'src/utils/parse-input-log-file';
import { QuestionsEnum } from '../types/enums/questions.enum';
import * as fs from 'fs';
import * as chalk from 'chalk';
import {
  validateInputPath,
  validateOutputPath,
} from 'src/utils/validate-paths';

export interface LogParseOptions {
  input: string;
  output: string;
  logLevel: LogLevel;
}

@Command({
  name: 'LogParse',
  description:
    'Parses a given input log file and generates an output file with the selected logLevel',
  options: {
    isDefault: true,
  },
})
export class LogParseCommand implements CommandRunner {
  constructor(private readonly inquirerService: InquirerService) {}

  async run(_passedParams: string[], options: LogParseOptions): Promise<void> {
    this.validatePromptOptions(options);
    options = await this.inquirerService.ask(
      QuestionsEnum.LogParseQuestions,
      options,
    );

    try {
      const outputLogs = parseInputLogFile(options);
      fs.writeFileSync(options.output, JSON.stringify(outputLogs, null, 2));
      console.log(
        chalk.green('An output log file has been generated in %s'),
        options.output,
      );
    } catch (err) {
      console.log(chalk.red(err.message));
      process.exit(1);
    }
  }

  validatePromptOptions({ input, output }: LogParseOptions) {
    try {
      this.validateOption(input, 'input');
      this.validateOption(output, 'output');
    } catch (err) {
      console.log(chalk.red(err.message));
      process.exit(1);
    }
  }

  @Option({
    flags: '-i, --input [input]',
    description: 'Path of the input log file',
  })
  parseInput(input: string): string {
    return input;
  }

  validateOption(value: string, option: 'input' | 'output'): void {
    if (value !== undefined) {
      const validate =
        option === 'input' ? validateInputPath : validateOutputPath;
      const validationMessage = validate(value);

      if (validationMessage !== undefined) {
        throw new Error(validationMessage);
      }
    }
  }

  @Option({
    flags: '-o, --output [output]',
    description: 'Path of the parsed output log file',
  })
  parseOutput(output: string): string {
    return output;
  }

  @Option({
    flags: '-l, --logLevel [logLevel]',
    description: 'Log level to parse',
  })
  parseLogLevel(logLevel: LogLevel): LogLevel {
    return logLevel;
  }
}
