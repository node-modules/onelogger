import { Logger } from './Logger.js';
import type { ILogger } from './ILogger.js';

export type * from './ILogger.js';
export * from './Logger.js';

export function setCustomLogger(loggerName: string, realLogger: ILogger | undefined) {
  Logger.setRealLogger(loggerName, realLogger);
}

export function setLogger(realLogger: ILogger) {
  setCustomLogger('logger', realLogger);
}

export function setCoreLogger(realLogger: ILogger) {
  setCustomLogger('coreLogger', realLogger);
}

const loggers = new Map<string, Logger>();

export function getCustomLogger(loggerName: string, prefix?: string) {
  const key = `${loggerName}-${prefix ?? ''}`;
  let logger = loggers.get(key);
  if (!logger) {
    logger = new Logger({ loggerName, prefix });
    loggers.set(key, logger);
  }
  return logger;
}

export function getLogger(prefix?: string) {
  return getCustomLogger('logger', prefix);
}

export function getCoreLogger(prefix?: string) {
  return getCustomLogger('coreLogger', prefix);
}
