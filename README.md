# vue2-this


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
