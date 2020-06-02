/**
 * 快速排序
 * 
 * 1. 选一个基准值
 * 2. 分区：大于基准值放到右侧，小于基准值放到左侧，等于基准值随意
 * 3. 递归左右分区，终止条件：分区长度 < 2
 * 
 * 时间复杂度：平均情况下快速排序的时间复杂度是Θ(nlgn), 最坏O(n^2)
 * 空间复杂度：由于递归调用，快排的空间复杂度是Θ(lgn)
 */

function quickSort(arr){
    const len = arr.length
    if(len < 2) return arr
    // 基准值
    const pivot = arr.pop()
    const [left, right] = [[], []]
    for(let num of arr){
        if(num >= pivot) right.push(num)
        else left.push(num)
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
}

console.log(quickSort([3,2,1]))