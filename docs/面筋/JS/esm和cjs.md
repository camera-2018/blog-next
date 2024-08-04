ESM输出的是`值的引用`，而CJS输出的是`值的拷贝`；

CJS的输出是`运行时加载`，而ESM是`编译时`输出接口；

CJS是`同步加载`，ESM是`异步加载`；


```ts
// 导出：export命令
export const obj = {name: 'E1e'}；

// 默认导出 export default命令
export default {name: 'E1e'};


// 引入接口：import命令

// 引入普通导出
import { obj } from './test.js';

// 引入默认导出
import obj from './test.js';

```

```ts
// 导出
const obj = {a: 1};
module.exports = obj;

// 引入
const obj = require('./test.js');

```
