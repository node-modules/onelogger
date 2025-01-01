# onelogger

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/node-modules/onelogger/actions/workflows/nodejs.yml/badge.svg)](https://github.com/node-modules/onelogger/actions/workflows/nodejs.yml)
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]
[![Node.js Version](https://img.shields.io/node/v/onelogger.svg?style=flat)](https://nodejs.org/en/download/)

[npm-image]: https://img.shields.io/npm/v/onelogger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/onelogger
[codecov-image]: https://codecov.io/gh/node-modules/onelogger/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/onelogger
[snyk-image]: https://snyk.io/test/npm/onelogger/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/onelogger
[download-image]: https://img.shields.io/npm/dm/onelogger.svg?style=flat-square
[download-url]: https://npmjs.org/package/onelogger

The only ONE logger.

## Install

```bash
npm i onelogger
```

## Usage

### Get logger

```ts
import { getLogger, getCoreLogger } from 'onelogger';

const logger = getLogger();
logger.info('hello world');
// => hello world

// get logger with prefix label
const loggerWithPrefix = getLogger('my-prefix-name1');
loggerWithPrefix.info('hello world');
// => [my-prefix-name1] hello world

// get coreLogger
const coreLogger = getCoreLogger('my-prefix-name2');
coreLogger.info('hello world on core logger');
// => hello world on core logger

// get coreLogger with prefix label
const coreLoggerWithPrefix = getCoreLogger('my-prefix-name2');
coreLoggerWithPrefix.info('hello world on core logger');
// => [my-prefix-name2] hello world on core logger
```

### Set custom logger

The default logger and coreLogger will pipe to `global.console`, you can change them to your real logger.
The custom logger must implements `ILogger` interface.

```ts
import { setLogger, setCoreLogger, setCustomLogger } from 'onelogger';

setLogger(customLogger);
setCoreLogger(customCoreLogger);
setCustomLogger('myBizLogger', myBizLogger);
getCustomLogger('myBizLogger');
```

## License

[MIT](LICENSE)

## Contributors

[![contributors](https://contrib.rocks/image?repo=node-modules/onelogger&max=240&columns=26)](https://github.com/node-modules/onelogger/graphs/contributors)
