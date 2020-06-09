function iPromise(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    // iPromise.then 的第一个函数 onFulfilled 集合，可能会用很多的 .then
    this.fn1Callback = [];
    // iPromise.then 的第二个函数 onRejected 集合，可能会用很多的 .then
    this.fn2Callback = [];

    const self = this;
    function resolve(value) {
        setTimeout(() => {
            if (self.status !== "pending") return;
            self.status = "fulfilled";
            self.value = value;
            for (let i = 0; i < self.fn1Callback.length; i++) {
                self.fn1Callback[i](value);
            }
        });
    }

    function reject(reason) {
        console.log("reject");
        setTimeout(() => {
            if (self.status !== "pending") return;
            self.status = "rejected";
            self.reason = reason;
            for (let i = 0; i < self.fn1Callback.length; i++) {
                self.fn2Callback[i](value);
            }
        });
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
}

iPromise.prototype.then = function (onFulfilled, onRejected) {
    console.log(".then");
    let promise2;
    let tryUserFn = (fn, reject) => {
        try {
            fn();
        } catch (error) {
            return reject(error);
        }
    };
    if (this.status === "pending") {
        return (promise2 = new iPromise((resolve, reject) => {
            tryUserFn(() => {
                this.fn1Callback.push((val) => {
                    let x = onFulfilled(val);
                    resolve(x);
                });
                this.fn2Callback.push(onRejected);
            }, reject);
        }));
    }

    if (this.status === "fulfilled") {
        console.log("then fulfilled");
        return (promise2 = new iPromise((resolve, reject) => {
            setTimeout(() => {
                tryUserFn(() => {
                    let x = onFulfilled(this.value);
                    resolve(x);
                });
            });
        }));
    }

    if (this.status === "rejected") {
        console.log("then rejected");
        return (promise2 = new iPromise((resolve, reject) => {
            setTimeout(() => {
                var x = onRejected(this.reason);
                reject(x);
            });
        }));
    }
};

// let t = new iPromise((res) => {
//     console.log(0);
//     res(1);
// })
//     .then((res) => {
//         console.log(a);
//         return 11
//     })
//     .then((res) => {
//         console.log(res);
//         return 11
//     })
//     .then((res) => {
//         console.log(res);
//         return 11
//     });

console.log("-------");
let t2 = new Promise((res) => {
    res(2);
})
    .then((res) => {
        console.log(a);
        return 22
    })
    .then((res) => {
        console.log(res);
        return 22
    })
    .then((res) => {
        console.log(res);
        return 22
    })
console.log(3);

// new Promise((res, rej) => {
//     setTimeout(() => {
//         reject("reject");
//     }, 1000);
// }).then((ress, rejj) => {
//     console.log(ress, rejj);
// });
