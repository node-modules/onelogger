# onelogger

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

[MIT](LICENSE.txt)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/156269?v=4" width="100px;"/><br/><sub><b>fengmk2</b></sub>](https://github.com/fengmk2)<br/>|
| :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Sat Jan 20 2024 22:39:14 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->
