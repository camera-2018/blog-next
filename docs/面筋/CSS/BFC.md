BFC（ `Block Formatting Context`， 名为 "块级格式化上下文"）个人理解指的是一个独立的布局环境，BFC 内部的元素布局与外部互不影响。

触发 BFC 的方式常见的有：

- float设置为 left、right
- overflow 设置为非 visiable
- positon 设置为 absolute、fixed
- display: inline-block
- display: table-cell
- display: flex
- display: table-caption

常见的 BFC 应用有：

- 解决浮动元素令父元素高度坍塌的问题（计算 BFC 的高度时，浮动子元素也参与计算）
- 解决非浮动元素被浮动元素覆盖问题
- 解决同一个 BFC 外边距垂直方向重合的问题

此外还有

- IFC：行内格式化上下文，将一块区域以行内元素的形式来格式化。
- GFC：网格布局格式化上下文，将一块区域以 grid 网格的形式来格式化
- FFC：弹性格式化上下文，将一块区域以弹性盒的形式来格式化



解决margin塌陷问题 

为了解决此问题可以使用`BFC`规则（为元素包裹一个盒子形成一个完全独立的空间，做到里面元素不受外面布局影响
（可以给其中一个盒子套一个p标签、套一个displayflex）


