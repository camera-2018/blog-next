# interface 和 type 区别

- 接口通过 interface 定义，type 是用来定义类型别名。
- 接口可以重复定义，type 不可以。
- 接口可以**继承**，type 不可以继承，**但是可以使用联合类型和交叉类型来模拟继承** 
- 类型用 & 连接起来就是交叉类型（产生一个包含所有属性的新类型），用 | 连接起来就是联合类型（产生一个包含所有类型的选择集类型）

interface 是接口，type是类型，本身就是两个概念。只是碰巧表现上比较相似。 希望定义一个变量类型，就用 type，如果希望是能够继承并约束的，就用 interface。 如果你不知道该用哪个，说明你只是想定义一个类型而非接口，所以应该用 type

TypeScript **泛型**是一种工具。它能让开发者不在定义时指定类型，而在使用时指定类型。
```ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```
