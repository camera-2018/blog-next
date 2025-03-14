# nextTick

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

`nextTick()` 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。


- #### **在数据变化后等待DOM更新**
- #### **在创建或销毁组件后等待DOM更新**
- #### **在异步更新队列中插入自己的回调**
- #### **处理大量数据**