css 中定位属性 position 解决了元素在页面上精确定位的问题，默认是 static，其他属性值 relative，absolute，fixed，sticky 是可以设置 left top right bottom 上下左右值对其进行定位。具体来说：  
- relative 是相对元素原来的位置偏移定位，不脱离文档流，原来的位置空间还保留  
- absolute 是相对于最近的非 static 祖先元素进行定位，脱离文档流 
- fixed 相对于视口进行定位，屏幕滚动定位位置不改变  
- sticky 是相对于最先滚动的祖先元素（overflow属性值非visibable的元素）滚动到设定的阈值前表现为相对定位，到达阈值后的滚动表现为固定定位  
从我的使用经验来一般来说像遮罩，弹窗等可以使用固定定位固定在屏幕的固定位置，弹窗里面的按钮比如右上角关闭按钮就可以使用绝对定位。同时fixed、sticky 会形成新的层叠上下文，relative、absolute 配合 z-index 也会生成新的层叠上下文。  