import { Question, QuestionSet } from 'nest-commander';
import * as fs from 'fs';
import { QuestionsEnum } from 'src/types/enums/questions.enum';
import { LogLevel } from 'src/types/enums/log-level';
import { endsWithAllowedFileExtension } from 'src/utils/validate-file-extension';

@QuestionSet({ name: QuestionsEnum.LogParseQuestions })
export class LogParseQuestions {
  @Question({
    type: 'input',
    name: 'input',
    message: 'Path of the input file?',
    validate: (input: string) => {
      const allowedExtensions = ['.log', '.txt'];
      if (!endsWithAllowedFileExtension(allowedExtensions, input)) {
        return `The input file must end with one of the following extensions [ ${allowedExtensions.join(
          ' | ',
        )} ]`;
      }

      if (!fs.existsSync(input)) {
        return `The specified input path doesn't exist`;
      }

      return true;
    },
  })
  parseInputPath(input: string) {
    return input;
  }

  @Question({
    type: 'input',
    name: 'output',
    message: 'Path of the output file?',
    validate: (input: string) => {
      const allowedExtensions = ['.json', '.txt'];
      if (!endsWithAllowedFileExtension(allowedExtensions, input)) {
        return `The output file must end with one of the following extensions [ ${allowedExtensions.join(
          ' | ',
        )} ]`;
      }

      return true;
    },
  })
  parseOutputPath(output: string) {
    return output;
  }

  @Question({
    type: 'list',
    name: 'logLevel',
    choices: Object.values(LogLevel),
    default: LogLevel.ERROR,
    message: 'Log level to parse?',
  })
  parseLogLevel(logLevel: LogLevel) {
    return logLevel;
  }
}
