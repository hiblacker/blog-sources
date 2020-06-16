// 实现一个带并发限制的异步任务调度器，保证同时最多运行2个任务
class Scheduler {
    constructor(opt = {}) {
        const defaultOption = { limit: 2 };
        const finalOption = Object.assign({}, defaultOption, opt);
        this.queue = [];
        this.holdOn = [];
        this.limit = finalOption.limit;
        this.id = 0;
    }
    add(promiseCreator) {
        return new Promise((resolve, reject) => {
            promiseCreator.resolve = resolve;
            promiseCreator.reject = reject;
            const len = this.queue.length;
            if (len < this.limit) {
                this.run(promiseCreator);
            } else {
                this.holdOn.push(promiseCreator);
            }
        });
    }
    run(promiseCreator) {
        const id = this.id++;
        let promise;
        try {
            promise = promiseCreator().then(() => {
                // 删除已完成
                this.queue = this.queue.filter((i) => i.id !== id);
                // 执行等待队列
                this.checkHoldOn();
                promiseCreator.resolve();
            });
        } catch (error) {
            promiseCreator.reject(error);
        }

        promise.id = id;
        this.queue.push(promise);
    }
    checkHoldOn() {
        if (this.holdOn.length > 0) {
            const task = this.holdOn.shift();
            this.run(task);
        }
    }
}

class Scheduler2 {
    list = []; //用来承载还未执行的异步

    count = 0; //用来计数

    constructor(num) {
        this.num = num; //允许同时运行的异步函数的最大个数
    }

    async add(fn) {
        if (this.count >= this.num)
            await new Promise((resolve) => {
                this.list.push(resolve);
            });

        this.count++;
        let result
        try {
            result = await fn()
        } catch (error) {
            console.log(error);
        }
        

        console.log({ result });
        this.count--;

        if (this.list.length > 0) {
            this.list.shift()();
        }

        return result;
    }
}

const timeout = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

const scheduler = new Scheduler({ limit: 2 });
const scheduler2 = new Scheduler2(2);

const addTask = (time, order) => {
    scheduler2
        .add(() => timeout(time))
        .then(() => console.log(`order: ${order}`));
};

// addTask(2000, 1);
// addTask(2000, 2);
// addTask(2000, 3);
// addTask(2000, 4);
// addTask(2000, 5);
// addTask(2000, 6);

// addTask(400, 4);
// addTask(200, 2);
// addTask(300, 3);
// addTask(100, 1);

// 应该输出：2 4 3 1

// 100 200 300 400 500 600
// 4   4   4   4
// 2   2
//     3   3   3
//             1

