// 实现一个带并发限制的异步任务调度器，保证同时最多运行2个任务
class Scheduler {
    add(promiseCreator) {

    }
}

const timeout = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

const scheduler = new Scheduler()

const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(400, 4)
addTask(200, 2)
addTask(300, 3)
addTask(100, 1)

// 输出：2 4 3 1

// 100 200 300 400 500 600
// 4   4   4   4
// 2   2
//     3   3   3
//             1