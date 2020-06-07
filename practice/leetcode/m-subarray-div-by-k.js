// 974. 和可被 K 整除的子数组 中等
// 给定一个整数数组 A，返回其中元素之和可被 K 整除的（连续、非空）子数组的数目。

// 示例：

// 输入：A = [4,5,0,-2,-3,1], K = 5
// 输出：7
// 解释：
// 有 7 个子数组满足其元素之和可被 K = 5 整除：
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]

// 提示：

// 1 <= A.length <= 30000
// -10000 <= A[i] <= 10000
// 2 <= K <= 10000

/**
 * 思路：暴力解法：穷举所有子数组
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var subarraysDivByK = function (A, K) {
    const sum = (arr) => arr.reduce((acc, cur) => (acc += cur), 0);
    let count = 0;
    for (let i = 0; i <= A.length; i++) {
        for (let j = i + 1; j <= A.length; j++) {
            const subArr = A.slice(i, j);
            const s = sum(subArr);
            if (s % K === 0) {
                count++;
            }
        }
    }
    return count;
};
// const res = subarraysDivByK([4, 5, 0, -2, -3, 1], 5);
// console.log({res});

/**
 * 优化解法
 *
 * 通常，涉及连续子数组和的时候，我们使用前缀和来解决
 *
 * 令字数列和：P[i] = A[0] + A[1] + ... + A[i]
 * 每个连续子数组的和 sum(i,j) 就可以写成 P[j] - P[i-1]
 *
 * 判断连续子数组和能被 K 整除，等价于：(P[j] - P[i-1]) mod K == 0
 *
 * 根据同余定理，等价于：P[j] mod K == P[i-1] mod K
 *
 */

var subarraysDivByK2 = function (A, K) {
    const hashMap = { 0: 1 };
    let count = 0,
        sum = 0;
    for (let i = 0; i < A.length; i++) {
        sum += A[i];
        let mod = sum % K;
        if (mod < 0) mod += K;
        let hash = hashMap[mod];
        // console.log(i, A[i], hash);
        if (hash) {
            count += hash
            hashMap[mod] = ++hash;
        }else {
            hashMap[mod] = 1
        }
        // console.log(hashMap);
    }
    return count;
};
const res = subarraysDivByK2([4, 5, 0, -2, -3, 1], 5);
console.log({ res });
