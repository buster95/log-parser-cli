import { Question, QuestionSet, ValidateFor } from 'nest-commander';
import { QuestionsEnum } from 'src/types/enums/questions.enum';
import { LogLevel } from 'src/types/enums/log-level';
import {
  validateInputPath,
  validateOutputPath,
} from 'src/utils/validate-file-extension';

@QuestionSet({ name: QuestionsEnum.LogParseQuestions })
export class LogParseQuestions {
  @Question({
    type: 'input',
    name: 'input',
    message: 'Path of the input file?',
  })
  parseInputPath(input: string) {
    return input;
  }

  @ValidateFor({
    name: 'input',
  })
  validateInputPathQuestion(input: string) {
    return validateInputPath(input) ?? true;
  }

  @Question({
    type: 'input',
    name: 'output',
    message: 'Path of the output file?',
    default: 'output-log.json',
  })
  parseOutputPath(output: string) {
    return output;
  }

  @ValidateFor({
    name: 'output',
  })
  validateOutputPathQuestion(output: string) {
    return validateOutputPath(output) ?? true;
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
