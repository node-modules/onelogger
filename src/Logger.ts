import { strict as assert } from 'node:assert';
import { format } from 'node:util';
import type { ILogger } from './ILogger.js';

declare global {
  // eslint-disable-next-line no-var
  var __ONE_LOGGER_INSTANCES__: Map<string, ILogger>;
}

globalThis.__ONE_LOGGER_INSTANCES__ = new Map<string, ILogger>();

export interface LoggerOptions {
  loggerName: string;
  prefix?: string;
}

export class Logger implements ILogger {
  #loggerName: string;
  #prefix?: string;

  constructor(options: LoggerOptions) {
    this.#loggerName = options.loggerName;
    this.#prefix = options.prefix;
  }
  info(message?: any, ...optionalParams: any[]): void {
    this.#log('info', message, ...optionalParams);
  }
  warn(message?: any, ...optionalParams: any[]): void {
    this.#log('warn', message, ...optionalParams);
  }
  error(message?: any, ...optionalParams: any[]): void {
    this.#log('error', message, ...optionalParams);
  }

  #log(level: 'info' | 'warn' | 'error', message?: any, ...optionalParams: any[]) {
    const realLogger = this._getRealLogger();
    if (this.#prefix) {
      const log = format(message, ...optionalParams);
      realLogger[level](`[${this.#prefix}] ${log}`);
    } else {
      realLogger[level](message, ...optionalParams);
    }
  }

  protected _getRealLogger() {
    return globalThis.__ONE_LOGGER_INSTANCES__.get(this.#loggerName) ?? globalThis.console;
  }

  static setRealLogger(loggerName: string, realLogger: ILogger | undefined) {
    if (!realLogger) {
      globalThis.__ONE_LOGGER_INSTANCES__.delete(loggerName);
    } else {
      assert(!(realLogger instanceof Logger), 'can\'t set realLogger to Logger instance');
      globalThis.__ONE_LOGGER_INSTANCES__.set(loggerName, realLogger);
    }
  }
}
