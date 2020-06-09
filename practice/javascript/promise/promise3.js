function iPromise(executor){
    var [status, value, reason, resolvedFns, rejectedFns] = ['pending', undefined, undefined, [], []]
    var that = this
    function resolve(data){
        if(!that.status === 'pending') return 
        setTimeout(() => {
            that.value = data
            that.status = 'fulfilled'
            that.resolvedFns.forEach(fn => fn(data))
        });
    }
    function reject(reason){
        if(!that.status === 'pending') return 
        setTimeout(() => {
            that.reason = reason
            that.status = 'rejected'
            that.rejectedFns.forEach(fn => fn(reason))
        });
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
}

iPromise.prototype.then = function(resolvedFn, rejectedFn){
    var that = this
    if(that.status === 'pending') {
        return new iPromise((resolve, reject) => {
            that.resolvedFns.push(resolvedFn)
            that.rejectedFns.push(rejectedFn)
            resolve()
        })
    }
    if(that.status === 'fulfilled') {
        return new iPromise((resolve, reject) => {
            resolve(resolvedFn(that.value))
        })
    }
}

new iPromise(res => res(111)).then(console.log)