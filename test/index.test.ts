import { strict as assert } from 'node:assert';
import { format } from 'node:util';
import {
  getLogger, setLogger,
  getCoreLogger, setCoreLogger,
  setCustomLogger, getCustomLogger,
} from '../src/index.js';

describe('index.test.ts', () => {
  describe('getLogger(), setLogger()', () => {
    afterEach(() => {
      setCustomLogger('logger', undefined);
    });

    it('should work', () => {
      const logger = getLogger();
      assert(logger);
      // same instance
      assert.equal(getLogger(), logger);
      logger.info('foo %o %d', 'bar', 1);
      setLogger(console);

      const loggerWithTest = getLogger('test');
      assert(loggerWithTest);
      loggerWithTest.info('foo %o %d', 'bar', 1);

      const logs: string[] = [];
      const customLogger = {
        info(...args: any[]) {
          logs.push(format(...args));
        },
        warn(...args: any[]) {
          logs.push(format(...args));
        },
        error(...args: any[]) {
          logs.push(format(...args));
        },
      };
      setLogger(customLogger);

      const loggerWithTest2 = getLogger('😄哈哈');
      assert.equal(getLogger('😄哈哈'), loggerWithTest2);
      assert(loggerWithTest2);
      loggerWithTest2.info('foo %o %d', 'bar', 1);
      getLogger().warn('warn normal logger here');
      getLogger().error('error normal logger here');
      getCoreLogger().info('core logger here');
      assert.equal(logs.length, 3);
      assert.equal(logs[0], '[😄哈哈] foo \'bar\' 1');
      assert.equal(logs[1], 'warn normal logger here');
      assert.equal(logs[2], 'error normal logger here');
      // reset to global
      setCustomLogger('logger', undefined);
      loggerWithTest2.info(111111);
      assert.equal(logs.length, 3);
    });
  });

  describe('getCoreLogger(), setCoreLogger()', () => {
    afterEach(() => {
      setCustomLogger('coreLogger', undefined);
    });

    it('should work', () => {
      const logger = getCoreLogger();
      assert(logger);
      logger.info('foo %o %d', 'bar', 1);
      setCoreLogger(console);

      const loggerWithTest = getCoreLogger('test');
      assert(loggerWithTest);
      loggerWithTest.info('foo %o %d', 'bar', 1);

      const logs: string[] = [];
      const customLogger = {
        info(...args: any[]) {
          logs.push(format(...args));
        },
        warn(...args: any[]) {
          logs.push(format(...args));
        },
        error(...args: any[]) {
          logs.push(format(...args));
        },
      };
      setCoreLogger(customLogger);

      const loggerWithTest2 = getCoreLogger('😄哈哈');
      assert(loggerWithTest2);
      loggerWithTest2.info('foo %o %d', 'bar', 1);
      getCoreLogger().info('core logger here');
      getLogger().info('normal logger here');
      assert.equal(logs.length, 2);
      assert.equal(logs[0], '[😄哈哈] foo \'bar\' 1');
      assert.equal(logs[1], 'core logger here');
    });
  });

  describe('getCustomLogger(), setCustomLogger()', () => {
    afterEach(() => {
      setCustomLogger('bizLogger', undefined);
    });

    it('should work', () => {
      const logger = getCustomLogger('bizLogger');
      assert(logger);
      assert.equal(getCustomLogger('bizLogger'), logger);
      logger.info('foo %o %d', 'bar', 1);
      setCoreLogger(console);

      const loggerWithTest = getCustomLogger('bizLogger', 'test');
      assert(loggerWithTest);
      loggerWithTest.info('foo %o %d', 'bar', 1);

      const logs: string[] = [];
      const customLogger = {
        info(...args: any[]) {
          logs.push(format(...args));
        },
        warn(...args: any[]) {
          logs.push(format(...args));
        },
        error(...args: any[]) {
          logs.push(format(...args));
        },
      };
      setCustomLogger('bizLogger', customLogger);

      const loggerWithTest2 = getCustomLogger('bizLogger', '😄哈哈');
      assert(loggerWithTest2);
      loggerWithTest2.info('foo %o %d', 'bar', 1);
      getCoreLogger().info('core logger here');
      getLogger().info('normal logger here');
      getCustomLogger('bizLogger').info('biz logger here');
      assert.equal(logs.length, 2);
      assert.equal(logs[0], '[😄哈哈] foo \'bar\' 1');
      assert.equal(logs[1], 'biz logger here');
    });
  });
});
