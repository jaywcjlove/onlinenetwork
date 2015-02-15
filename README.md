## js判断是否断网了

此方法是通过 `online` 和 `offline` 事件来侦听是否断网，但是这个在 `IE ` 和 `Firefox` 中，并非断网了就是真的断网了。（如火狐中在选择 `菜单>>文件>>脱机工作`才会触发 `online` 和 `offline` 事件）    

总之在`IE`和`Firefox`中一般情况下不能触发这俩事件，只有在选择脱机状态下才能触发此事件。

### 设置轮询时间和地址
在online.js中设置以下

> `time` 设置轮询时间  
> `url` 当 `url`为空的时候 默认所有浏览器使用 onLine 和 offline事件  
>  - url 不为空的时候 IE  和 Firefox 使用 AJAX 轮询判断网络是否连接
>  - url 请求的可以是服务器一个空php 等文件
>  - 文件可以设置头文件，避免轮询跑更多的流量


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
