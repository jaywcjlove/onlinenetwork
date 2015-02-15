## 判断是否网络断了

### 设置轮询时间和地址

> `time` 设置轮询时间  
> `url` 当 `url`为空的时候 默认所有浏览器使用 onLine 和 offline事件  

### 侦听是否连上网络

```js
window.onLineHandler = function(){
    console.log("连上了！")
};
```

### 侦听是否断开网络

```js
window.offLineHandler = function(){
    console.log("断开网络！")
};
```
