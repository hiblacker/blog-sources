// 洗牌算法

// 1. sort 利用Array的sort方法可以更简洁的实现打乱，对于数量小的数组来说足够。因为随着数组元素增加，随机性会变差。
function shuffle1(arr) {
    return arr.sort(() => 0.5 - Math.random());
}

// 2. ES6 实现，代码更简洁
function shuffle2(arr) {
    let len = arr.length,
        random;
    while (len != 0) {
        // 无符号右移位运算符向下取整
        random = (Math.random() * len--) >> 0;
        [arr[len], arr[random]] = [arr[random], arr[len]];
    }
    return arr;
}

/**
先看最经典的 Fisher-Yates 的洗牌算法

其算法思想就是 从原始数组中随机抽取一个新的元素到新数组中

1. 从还没处理的数组（假如还剩n个）中，产生一个[0, n]之间的随机数 random
2. 从剩下的n个元素中把第 random 个元素取出到新数组中
3. 删除原数组第random个元素
4. 重复第 2 3 步直到所有元素取完
5. 最终返回一个新的打乱的数组
按步骤一步一步来就很简单的实现

注意：会改变原数组
*/
function shuffle3(arr) {
    let len = arr.length;
    const goal = [];
    while (len > 0) {
        const random = (Math.random() * len) >> 0
        goal.push(...arr.splice(random, 1))
        len--
    }
    return goal
}
