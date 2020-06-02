// 394. 字符串解码 中等难度
// 给定一个经过编码的字符串，返回它解码后的字符串。

// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

// 示例:

// s = "3[a]2[bc]", 返回 "aaabcbc".
// s = "3[a2[c]]", 返回 "accaccacc".
// s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".

/**
 * 思路：辅助栈
 * 1. 遍历每一个字符
 * 2. 若为数字，存储倍数
 * 3. 若为字母，存储字符串
 * 4. 若为 [ , 入栈
 * 5. 若为 ] , 出栈，输出倍数 * 字符串
 * 6. 循环，直至遍历结束
 *
 * s = "3[a2[c]]"
 * 1. 3 -> multi: 3
 * 2. [ -> multi: ''   cur: ''   stack: [[3, '']]
 * 3. a -> multi: ''   cur: 'a'  stack: [[3, '']]
 * 4. 2 -> multi: '2'  cur: 'a'  stack: [[3, '']]
 * 5. [ -> multi: ''   cur: ''   stack: [[3, ''], [2, 'a']]
 * 6. c -> multi: ''   cur: 'c'  stack: [[3, ''], [2, 'a']]
 * 7. ] -> multi: ''   cur: ''   stack: [[3, '']]           
 * 8. ] -> multi: ''   cur: ''   stack: [[3, '']]     
 */

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    let multi = "";
    // stack: [multi, res][]
    let stack = [];
    let res = "";
    let len = s.length;
    for (let i = 0; i < len; i++) {
        const str = s.charAt(i);
        if (/[0-9]/.test(str)) {
            multi += str;
        } else if (/[a-zA-Z]/.test(str)) {
            res += str;
        } else if (str === "[") {
            stack.push([+multi, res]);
            multi = res = "";
        } else {
            let [multi, prev] = stack.pop();
            res = prev + res.repeat(multi);
        }
    }
    return res
};

console.log(decodeString("3[a]2[bc]"));
console.log(decodeString("3[a2[c]]"));
console.log(decodeString("2[abc]3[cd]ef"));

/**
 * 其它：
 * s.charAt(index) 和 s[index] 访问字符的区别：
 *      1. chartAt 为 ES1 方法 支持IE6-8，s[index] 为 ES5 不支持。
 *      2. 超出范围 chartAt 返回空字符串 s[index] 返回undefined。
 *
 */
