# Analog Promise

[![NPM version](https://img.shields.io/npm/v/analog-promise.svg?style=flat)](https://www.npmjs.com/package/analog-promise)
[![NPM monthly downloads](https://img.shields.io/npm/dm/analog-promise.svg?style=flat)](https://npmjs.org/package/analog-promise)
[![Build Status](https://img.shields.io/travis/jonschlinkert/analog-promise.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/analog-promise)

一个模拟 jQuery promise 的库。

## 安装

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install analog-promise --save
```

## 使用
```javascript
var analogPromise = new AnalogPromise();
//同意时
analogPromise.resolve();
//拒绝时
analogPromise.reject();
//异步处理函数写在then中
analogPromise.then(function(){});
```

## License

[MIT](LICENSE)
