'use strict';

require('mocha');
const assert = require('assert');
const AnalogPromise = require('./');
const PROMISE_STATUS = AnalogPromise.PROMISE_STATUS;
const STATUS_CAN_CHANGE = AnalogPromise.STATUS_CAN_CHANGE;

var TIME_DELAY = 1000;
describe('analogPromise',function(){
	it('resolve测试',function(done) {
		var analogPromise = new AnalogPromise();
		var begin = Date.now();
		setTimeout(function() {
			analogPromise.resolve();
		}, TIME_DELAY);
		analogPromise.then(function(){
			assert(Date.now() - begin >= TIME_DELAY);
			done();
		});
	});
	//如果有错误就直接抛异常就好了throw new Error('');
	//或者再assert断言函数中如果条件是false也是报错
	//直接运行done()默认就是成功的
	//如果断言的函数不是异步函数，不需要done时，函数中的参数一定不要传这个参数，不然会导致测试失败
	it('测试是否会将回掉函数添加到回掉数组中',function(){
		var analogPromise = new AnalogPromise();
		analogPromise.then(function(){
			console.log('test');
		});
		assert(analogPromise._callbackArr.length>0);
	});

	it('resolve后是否会清空回掉数组',function(){
		var analogPromise = new AnalogPromise();
		analogPromise.then(function(){});
		analogPromise.resolve();
		assert(analogPromise._callbackArr.length===0);
	});

	it('reject后是否会清空回掉数组',function(){
		var analogPromise = new AnalogPromise();
		analogPromise.then(function(){});
		analogPromise.reject();
		assert(analogPromise._callbackArr.length===0);
	});

	it('状态一旦设定是否还会再改变',function(done){
		var analogPromise = new AnalogPromise();
		assert(analogPromise._status===0);
		analogPromise.resolve();
		assert(analogPromise._status===1);
		analogPromise.reject();
		assert(analogPromise._status===1);

		var analogPromise2 = new AnalogPromise();
		assert(analogPromise2._status===0);
		analogPromise2.reject();
		assert(analogPromise2._status===2);
		analogPromise.resolve();
		assert(analogPromise2._status===2);

		done();
	});

	it('同意后继续then是否起作用',function(done){
		var analogPromise = new AnalogPromise();
		analogPromise.then(function(){});
		analogPromise.resolve();
		analogPromise.then(function(){done();});
	});

	it('拒绝后继续then是否无效',function(done){
		var analogPromise = new AnalogPromise();
		analogPromise.then(function(){});
		analogPromise.reject();
		analogPromise.then(function(){
			throw new Error('');
		});
		done();
	});
});

