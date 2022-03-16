import * as fs from 'fs';
import { LogParseOptions } from 'src/commands/log-parse.command';
import { LogLevel } from 'src/types/enums/log-level';
import { OutputLog } from 'src/types/interfaces/output-log';

export function parseInputLogFile(
  logLevel: LogLevel,
  options: LogParseOptions,
) {
  const inputLogData = fs.readFileSync(options.input, 'utf8');
  const logs = inputLogData.split(
    /\s+(?=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)/, // ISO 8601 -> YYYY-MM-DDTHH:mm:ss.sssZ
  );

  const outputLogs = buildOutputLog(logLevel, logs);
  fs.writeFileSync(options.output, JSON.stringify(outputLogs, null, 2));
}

function buildOutputLog(logLevel: LogLevel, logs: string[]): OutputLog[] {
  const logLevelRegex = new RegExp(` - ${logLevel} - `);
  const filteredLogs = logs.filter((log) => log.match(logLevelRegex));
  const outputLogs: OutputLog[] = [];

  filteredLogs.forEach((log) => {
    const [logDate, additionalData] = log.split(logLevelRegex);
    const { transactionId, ...data } = JSON.parse(additionalData);

    const outputLog: OutputLog = {
      timestamp: new Date(logDate).getTime(),
      logLevel,
      transactionId,
    };

    if (logLevel === LogLevel.ERROR) {
      outputLog.err = data.err;
    } else {
      outputLog.additionalInfo = data;
    }

    outputLogs.push(outputLog);
  });

  return outputLogs;
}
