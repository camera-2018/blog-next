ES6 扩展元素符`...`

```js
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

function push(array, ...items) {
  array.push(...items);
}

//copy
const a1 = [1, 2];
const [...a2] = a1;
// [1,2]

//merge
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

[...'hello']
// [ "h", "e", "l", "l", "o" ]

```

通过扩展运算符实现的是浅拷贝，修改了引用指向的值，会同步反映到新数组


解构赋值

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

Array.from()

将两类对象转为真正的数组：类似数组的对象和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）
还可以接受第二个参数接受处理函数


Array.of()

用于将一组值，转换为数组


Array()

```js
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```



`sort()`默认设置为稳定的排序算法

```js
const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1;
  return 1;
};

arr.sort(stableSorting)
// ["apple", "peach", "straw", "spork"]
```

push

`push()`方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度


unshift 

unshift()在数组开头添加任意多个值，然后返回新的数组长度


splice
增：传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组
删：传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组
改：传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响


concat()

首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组


pop
`pop()` 方法用于删除数组的最后一项，同时减少数组的`length` 值，返回被删除的项


shift 
`shift()`方法用于删除数组的第一项，同时减少数组的`length` 值，返回被删除的项

slice
slice() 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组，传入开始和结束位置

indexOf()
返回要查找的元素在数组中的位置，如果没找到则返回 -1

includes()
返回要查找的元素在数组中的位置，找到返回`true`，否则`false`

find()
返回第一个匹配的元素

join()
join() 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串


forEach()
对数组每一项都运行传入的函数，没有返回值
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers.forEach((item, index, array) => {
    // 执行某些操作
});
```

filter()
对数组每一项都运行传入的函数，函数返回 `true` 的项会**组成数组**之后返回
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let filterResult = numbers.filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```

map()
对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组
```js
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult) // 2,4,6,8,10,8,6,4,2
```