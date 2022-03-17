import { Module } from '@nestjs/common';
import { LogParseCommand } from './commands/log-parse.command';
import { LogParseQuestions } from './questions/log-parse.questions';

@Module({
  providers: [LogParseCommand, LogParseQuestions],
})
export class AppModule {}
