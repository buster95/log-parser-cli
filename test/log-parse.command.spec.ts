import { TestingModule } from '@nestjs/testing';
import { CommandTestFactory } from 'nest-commander-testing';
import { LogLevel } from 'src/types/enums/log-level';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import { expectedOutputLogLevelError } from 'src/test-helpers/expected-output-logs';

describe('LogParse command', () => {
  let command: TestingModule;

  beforeAll(async () => {
    command = await CommandTestFactory.createTestingCommand({
      imports: [AppModule],
    }).compile();
  });

  it('should generate the expected output log file when logLevel is set to error', async () => {
    const outputFilePath = 'test/output.json';
    CommandTestFactory.setAnswers([
      'test/test.log',
      outputFilePath,
      LogLevel.ERROR,
    ]);
    const spyLog = jest.spyOn(console, 'log');
    await CommandTestFactory.run(command);
    expect(spyLog).toHaveBeenCalledWith(
      '\x1B[32mAn output log file has been generated in %s\x1B[39m',
      'test/output.json',
    );
    expect(fs.existsSync(outputFilePath)).toBe(true);
    expect(JSON.parse(fs.readFileSync(outputFilePath, 'utf8'))).toEqual(
      expectedOutputLogLevelError,
    );
    fs.unlinkSync(outputFilePath);
  });
});
