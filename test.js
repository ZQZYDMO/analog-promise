'use strict';

require('mocha');
const assert = require('assert');
const AnalogPromise = require('./');
const PROMISE_STATUS = AnalogPromise.PROMISE_STATUS;

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
    
    it('测试是否会将回掉函数添加到回掉数组中',function(){
        var analogPromise = new AnalogPromise();
        analogPromise.then(function(){
            // console.log('test');
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
        assert(analogPromise._status===PROMISE_STATUS.INIT);
        analogPromise.resolve();
        assert(analogPromise._status===PROMISE_STATUS.RESOLVE);
        analogPromise.reject();
        assert(analogPromise._status===PROMISE_STATUS.RESOLVE);

        var analogPromise2 = new AnalogPromise();
        assert(analogPromise2._status===PROMISE_STATUS.INIT);
        analogPromise2.reject();
        assert(analogPromise2._status===PROMISE_STATUS.REJECT);
        analogPromise.resolve();
        assert(analogPromise2._status===PROMISE_STATUS.REJECT);

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

