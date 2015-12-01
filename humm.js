var Future          = Npm.require('fibers/future'),
    hummUnwrapped   = Npm.require('humm'),
    //do not require wrapping
    blacklistFunction = ['init', 'isAuthorised', 'getAccessToken', 'setAccessToken'];

humm = {};

/**
 *
 * @param fn
 * @param context
 * @returns {Function}
 */
var wrapAsync = function(fn, context) {
    return function (/* arguments */) {
        var self = context || this;
        var newArgs = _.toArray(arguments);
        var callback;

        for (var i = newArgs.length - 1; i >= 0; --i) {
            var arg = newArgs[i];
            var type = typeof arg;
            if (type !== "undefined") {
                if (type === "function") {
                    callback = arg;
                }
                break;
            }
        }

        if(!callback) {
            var fut = new Future();
            callback = function(error, data) {
                fut.return({ error:  error, data: data });
            };
            ++i;
        }

        newArgs[i] = Meteor.bindEnvironment(callback);
        var result = fn.apply(self, newArgs);
        return fut ? fut.wait() : result;
    };
};

/**
 * Foreach function wrap beside blacklisted functions
 */
for(var key in hummUnwrapped){
    if(hummUnwrapped.hasOwnProperty(key)){
        var objOrFun = hummUnwrapped[key];
        // if we need to wrap
        if(blacklistFunction.indexOf(key) === -1){
            if(_.isFunction(objOrFun)){
                humm[key] = wrapAsync(objOrFun, humm);
            }else if(_.isObject(objOrFun)){
                humm[key] = {};
                for(var secKey in objOrFun){
                    if(objOrFun.hasOwnProperty(secKey)){
                        var fun = objOrFun[secKey];
                        if(_.isFunction(fun)){
                         /*   console.log(key);
                            console.log(secKey);
                            console.log(fun);*/
                            humm[key][secKey] = wrapAsync(fun, humm);
                        }
                    }
                }
            }
        }else{
            humm[key] = objOrFun;
        }

    }
}