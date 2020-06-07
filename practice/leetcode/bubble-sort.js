/**
 * 冒泡排序
 * 
 * 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
 * 3. 针对所有的元素重复以上的步骤，除了最后一个。
 * 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
 * 
 */

function bubbleSort(arr){
    const len = arr.length - 1
    for(let i in arr){
        for (let j = 0; j < len - i; j++) {
            const cur = arr[j];
            const next = arr[j + 1];
            console.log({cur, next});
            if(cur > next) [arr[j], arr[j + 1]] = [next, cur]
        }
    }
    return arr
}

const arr = [3,2,1,6,5,4,3,3,2]
console.log(bubbleSort(arr))