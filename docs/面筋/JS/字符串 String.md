concat
用于将一个或多个字符串拼接成一个新字符串

- slice()
- substr()
- substring()

```js
let stringValue = "hello world";
console.log(stringValue.slice(3)); // "lo world"截取n之后
console.log(stringValue.substring(3)); // "lo world"截取n之后
console.log(stringValue.substr(3)); // "lo world"截取n之后
console.log(stringValue.slice(3, 7)); // "lo w"截取n之后m之前
console.log(stringValue.substring(3,7)); // "lo w"截取n之后m之前
console.log(stringValue.substr(3, 7)); // "lo worl"截取n之后m个
```


trim()、trimLeft()、trimRight()
删除前、后或前后所有空格符，再返回新的字符串 中间的不删

repeat()
接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果

padEnd()
复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件

toLowerCase()、 toUpperCase()
大小写转化


charAt()
返回给定索引位置的字符，由传给方法的整数参数指定

indexOf()
从字符串开头去搜索传入的字符串，并返回位置（如果没找到，则返回 -1 ）

startWith()、includes()
从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值



split
把字符串按照指定的分割符，拆分成数组中的每一项

```js
let str = "12+23+34"
let arr = str.split("+") // [12,23,34]
```

match()
接收一个参数，可以是一个正则表达式字符串，也可以是一个RegExp对象，返回数组

search()
接收一个参数，可以是一个正则表达式字符串，也可以是一个RegExp对象，找到则返回匹配索引，否则返回 -1


replace()
接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）