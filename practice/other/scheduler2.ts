// 实现一个带并发限制的异步任务调度器，保证同时最多运行2个任务

class Scheduler3 {
    list: Function[] = [];
    count: number = 0;
    limit: number;
    constructor(limit: number) {
        this.limit = limit;
    }
    async add(fn: () => Promise<any>): Promise<any> {
        if (this.count >= this.limit) {
            return new Promise((resolve) => {
                this.list.push(resolve);
            });
        }
        this.count++;
        let result = await fn();
        this.count--;
        if (this.list.length > 0) {
            this.list.shift()();
        }
        return result;
    }
}

const scheduler3 = new Scheduler3(2);

const timeout2 = (time) =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

const addTask3: (time: number, order: number) => void = (
    time: number,
    order: number
) => {
    scheduler3
        .add(() => timeout2(time))
        .then(() => console.log(`order: ${order}`));
};

addTask3(400, 4);
addTask3(200, 2);
addTask3(300, 3);
addTask3(100, 1);

console.log(111)
