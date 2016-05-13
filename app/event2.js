define(function() {

    // 所有的订阅主题
    var _events = {};

    var _uid = 0; //token id

    var _getUid = function() {
        return ++_uid;
    };

    // 订阅事件
    var subscribe = function(type, callback) {
        if (! type || ! callback) { // type不能定义为0
            console.log("subscribe failed: " + type + "," + callback);
            return;
        }

        if (Object.prototype.toString.call(callback) != "[object Function]") {
            console.log("subscribe failed: callback is not a function");
            return;
        }

        var uid = _getUid();

        _events[uid] = {
            type: type,
            callback: callback
        };

        return uid;
    };

    // 取消订阅事件
    var unsubscribe = function(uid) {
        if (uid === undefined || uid === null) {
            return;
        }

        if (! _events[uid]) {
            return;
        }

        _events[uid] = null;
        delete _events[uid];
    };

    // 发布事件
    var publish = function(type, params) {
        if (! type) { // type不能定义为0
            console.log("publish failed: " + type);
            return;
        }

        for (var key in _events) {
            var subject = _events[key];
            if (subject.type == type) { //不区分数字和字符串
                var func = subject["callback"];
                func && func(params);
            }
        }
    };

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        publish: publish
    };
});
