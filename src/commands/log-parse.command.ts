import { Logger } from '@nestjs/common';
import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { LogLevel } from 'src/types/enums/log-level';
import { parseInputLogFile } from 'src/utils/parse-input-log-file';
import { QuestionsEnum } from '../types/enums/questions.enum';

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
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly logger: Logger,
  ) {}

  async run(_passedParams: string[], options: LogParseOptions): Promise<void> {
    options = await this.inquirerService.ask(
      QuestionsEnum.LogParseQuestions,
      options,
    );

    try {
      parseInputLogFile(options.logLevel, options);
    } catch (err) {
      this.logger.error(err);
      throw new Error(
        'An error has occurred trying to parse the input log file',
      );
    }
  }

  @Option({
    flags: '-i, --input [input]',
    description: 'Path of the input log file',
  })
  parseInput(input: string): string {
    return input;
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
