(function (window) {
    var PROMISE_STATUS = AnalogPromise.PROMISE_STATUS = {
        INIT: 0,
        RESOLVE: 1,
        REJECT: 2
    };
    var STATUS_CAN_CHANGE = AnalogPromise.STATUS_CAN_CHANGE = {
        DISABLE: 0,
        ENABLE: 1
    };
    function AnalogPromise() {
        this._callbackArr = [];
        this._status = PROMISE_STATUS.INIT; //0初始定义1成功2失败
        this._status_can_change = STATUS_CAN_CHANGE.ENABLE;//状态是否可以改变，理论上只允许改变一次
    }
    AnalogPromise.prototype.then = function (cb) {
        if (this._status == 0) {
            this._callbackArr.push(cb);
        } else if (this._status == 1) {
            cb();
        } else if (this._status == 2) {
            this._callbackArr = [];
        }
    };
    AnalogPromise.prototype.resolve = function () {//解决
        if (this._status_can_change) {
            this._status = PROMISE_STATUS.RESOLVE;
            this._callbackArr.forEach(function (item) {
                item();
            });
            this._callbackArr = [];
            this._status_can_change = STATUS_CAN_CHANGE.DISABLE;
        }
    };
    AnalogPromise.prototype.reject = function () { //拒绝
        if (this._status_can_change) {
            this._status = PROMISE_STATUS.REJECT;
            this._callbackArr = [];
            this._status_can_change = STATUS_CAN_CHANGE.DISABLE;
        }
    };
    if (typeof exports === 'object') {
        module.exports = AnalogPromise;
    }
    /* else if (typeof define === 'function' && define.amd) {
            define(factory);
        }*/
    else {
        window.AnalogPromise = AnalogPromise;
    }
})(this);