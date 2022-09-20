# vue2-this

## 原理
- data: 通过proxy代理将this.XXX 代理到 this._data.XXX

```
function noop (a, b, c) {}
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
```
- method: 将methods里的方法，通过.bind方法修改 this 指向，指向vue实例。并且将methods方法赋值到vue实例上。

```
for (var key in methods) {
    // 可以通过this直接访问到methods里面的函数的原因
    vm[key] = typeof methods[key] !== 'function' ? noop : methods[key].bind(vm)
}
```

## 学习的知识

1. `! + tab` 自动生成html5

2. `http-server`: 一个超轻量级web服务器
http-server可以将任何一个文件夹当作服务器的目录供自己使用

```
npm i -g http-server
cd vue2-this
http-server .
// 如果碰到端口被占用，也可以指定端口
http-server -p 8081 .
```

3. `for (var key in methods)`替换
```
    const keys = Object.key(methods);
    keys.map((i) => i)
```

4. 判断是不是用了 new 关键词调用构造函数。既new Vue()
```
function Vue (options) {
    if (!(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}

```

5. [`Object.defineProperty()`](https://segmentfault.com/a/1190000007434923)
- 语法：
`Object.defineProperty(obj, prop, descriptor)`

- 参数说明：
    - obj：必需。目标对象
    - prop：必需。需定义或修改的属性的名字
    - descriptor：必需。目标属性所拥有的特性

- 返回值：
传入函数的对象。即第一个参数obj

针对属性，我们可以给这个属性设置一些特性，比如是否只读不可以写；是否可以被for..in或Object.keys()遍历。

给对象的属性添加特性描述，目前提供两种形式：`数据描述`和`存取器描述`。

`数据描述`

```
var obj = {
    test:"hello"
}
Object.defineProperty(obj,"test",{
    configurable:true | false, // 属性是否可以使用delete删除、否可以再次设置特性
    enumerable:true | false, // 属性是否可以被枚举（使用for...in或Object.keys()）
    value:任意类型的值,
    writable:true | false // 值是否可以被重写
});
```

`存取器描述`
```
var obj = {};
Object.defineProperty(obj,"newKey",{
    get:function (){} | undefined,
    set:function (value){} | undefined
    configurable: true | false // 属性是否可以使用delete删除、否可以再次设置特性
    enumerable: true | false  // 属性是否可以被枚举（使用for...in或Object.keys()）
});
```

- 实现
作用： Vue中通过 this.XXX 可以访问到 this._data.XXX

```
function noop (a, b, c) {}
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

6. 判断是否是内部私有保留的字符串$ 和 _ 开头
```
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}
isReserved('_data'); // true
isReserved('$options'); // true
isReserved('data'); // false
isReserved('options'); // false
```