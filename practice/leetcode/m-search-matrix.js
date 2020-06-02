// 240. 搜索二维矩阵 II 中等
// 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

// 每行的元素从左到右升序排列。
// 每列的元素从上到下升序排列。
// 示例:

// 现有矩阵 matrix 如下：

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]

// 给定 target = 5，返回 true。
// 给定 target = 20，返回 false。

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// 暴力搜索
var searchMatrix = function (matrix, target) {
    // 超时
    // return !!matrix.toString().split(',').includes(target)
    const len = matrix.length;
    for (let x = 0; x < len && matrix[x][0] <= target; x++) {
        for (let y = 0; y < matrix[x].length && matrix[x][y] <= target; y++) {
            if (matrix[x][y] === target) return true;
        }
    }
    return false;
};

/**
 * 缩小问题规模（减治）
 * 1. 设矩阵右上角为matrix[i][j]
 * 2. matrix[i][j] > target 排除顶行 i++
 * 3. matrix[i][j] < target 排除右列 j--
 * 4. 循环2、3 直到 matrix[i][j] < target 或所有行列均被排除 i < 0 || j < 0
 *
 */
var searchMatrix2 = function (matrix, target) {
    if (matrix.length == 0 || matrix[0].length == 0) return false;
    let i = 0;
    let j = matrix[0].length - 1;
    while (i <= matrix.length - 1 && j >= 0) {
        console.log(i, j, matrix[i][j], target);
        if (matrix[i][j] < target) i++;
        else if (matrix[i][j] > target) j--;
        else return true;
    }
    return false;
};

const testArr = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
];
const testArr2 = [[-5]];
// console.log(searchMatrix2(testArr, 5));
// console.log(searchMatrix2(testArr, 20));
console.log(searchMatrix2(testArr2, -5));
