export interface OutputLog {
  timestamp: number;
  logLevel: string;
  transactionId: string;
  err?: string;
  additionalInfo?: Record<string, string>;
}
