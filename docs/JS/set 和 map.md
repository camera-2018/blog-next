- Set
    - 成员唯一、无序且不重复
    - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
    - 可以遍历，方法有：add、delete、has
- WeakSet
    - 成员都是对象
    - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
    - 不能遍历，方法有add、delete、has
- Map
    - `Map`类型是键值对的有序列表，而键和值都可以是任意类型
    - 本质上是键值对的集合，类似集合
    - 可以遍历，方法很多可以跟各种数据格式转换
- WeakMap
    - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
    - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    - 不能遍历，方法有get、set、has、delete


forEach 方法
```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

去重

```js
// 数组
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]

// 字符串
let str = "352255";
let unique = [...new Set(str)].join(""); // "352"
```