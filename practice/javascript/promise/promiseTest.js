new Promise((resolve, reject) => {
    console.log(1);
    Promise.resolve();
    resolve();
})
    .then((res) => {
        console.log(2);
        Promise.resolve().then((res) => {
            console.log(4);
        });
        setTimeout(() => {
            console.log(6);
        });
        console.log(5);
    })
    .then((res) => {
        console.log(3);
    })
    .catch(() => console.log(7))
    .then(() => console.log(8));

setTimeout(() => {
    console.log(9)
});


// 注：根据规范 [2.2.4](https://promisesaplus.com/#point-34) then 中 onFulfilled 或 onRejected 必须在执行环境堆栈只包含平台代码后调用。

// 平台代码：引擎，环境，和 promise 实现代码。实际上，这个要求确保 onFulfilled 和 onRejected 都在下一轮的事件循环中（一个新的栈）被异步调用。可以用宏任务，例如：setTimeout，setImmediate 或者微任务，例如：MutationObsever 或 process.nextTick 实现。 由于 promise 的实现被当做平台代码，所以它本身可能包含一个任务队列或 “trampoline” 的处理程序