import * as fs from 'fs';
import { LogParseOptions } from 'src/commands/log-parse.command';
import {
  expectedOutputLogLevelError,
  expectedOutputLogLevelDebug,
  expectedOutputLogWarn,
  expectedOutputLogInfo,
} from 'src/test-helpers/expected-output-logs';
import {
  inputLogSample,
  inputLogOnlyWithDebug,
} from 'src/test-helpers/input-log-examples';
import { LogLevel } from 'src/types/enums/log-level';
import { parseInputLogFile } from './parse-input-log-file';

describe('ParseInputLogFile', () => {
  const fsSpyReadFileSync = jest.spyOn(fs, 'readFileSync');
  const logParseOptions: LogParseOptions = {
    input: './app.log',
    output: 'output.json',
    logLevel: LogLevel.ERROR,
  };

  afterAll(() => {
    fsSpyReadFileSync.mockRestore();
  });

  it('should return an empty array if the input file is empty', () => {
    fsSpyReadFileSync.mockReturnValue('');
    const outputLogs = parseInputLogFile(logParseOptions);
    expect(outputLogs).toHaveLength(0);
  });

  it(`should return an empty array if the input log doesn't include a logLevel error`, () => {
    fsSpyReadFileSync.mockReturnValue(inputLogOnlyWithDebug);
    const outputLogs = parseInputLogFile(logParseOptions);
    expect(outputLogs).toHaveLength(0);
  });

  it('should return the expected output log when the logLevel is set to error ', () => {
    fsSpyReadFileSync.mockReturnValue(inputLogSample);
    const outputLogs = parseInputLogFile(logParseOptions);
    expect(outputLogs).toEqual(expectedOutputLogLevelError);
  });

  it('should return the expected output log when the logLevel is set to debug ', () => {
    fsSpyReadFileSync.mockReturnValue(inputLogSample);
    const outputLogs = parseInputLogFile({
      ...logParseOptions,
      logLevel: LogLevel.DEBUG,
    });
    expect(outputLogs).toEqual(expectedOutputLogLevelDebug);
  });

  it('should return the expected output log when the logLevel is set to warn ', () => {
    fsSpyReadFileSync.mockReturnValue(inputLogSample);
    const outputLogs = parseInputLogFile({
      ...logParseOptions,
      logLevel: LogLevel.WARN,
    });
    expect(outputLogs).toEqual(expectedOutputLogWarn);
  });

  it('should return the expected output log when the logLevel is set to info ', () => {
    fsSpyReadFileSync.mockReturnValue(inputLogSample);
    const outputLogs = parseInputLogFile({
      ...logParseOptions,
      logLevel: LogLevel.INFO,
    });
    expect(outputLogs).toEqual(expectedOutputLogInfo);
  });
});
