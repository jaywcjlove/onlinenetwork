;(function(w){
    var xmlhttp = new XMLHttpRequest(),
        time=2000,//设置轮询时间
        url ="",//当 `url`为空的时候 默认所有浏览器使用 onLine 和 offline事件
        OL  = OL || {};

    OL={
        OL_api:{//扩展API
            onLineHandler:function(func){
                onlinenetwork.online=func
                return this
            },
            offLineHandler:function(func){
                onlinenetwork.offline=func
                return this
            }
        },
        setStatus:function (newStatus) {
            this.eventStatus(newStatus);
            w.onLine = newStatus;
        },
        //状态改变执行事件
        eventStatus: function (newStatus) {
            if (newStatus === true && onlinenetwork.online !== undefined && (w.onLine !== true || this.handlerFired === false)) {
                onlinenetwork.online();
            }
            if (newStatus === false && onlinenetwork.offline !== undefined && (w.onLine !== false || this.handlerFired === false)) {
                onlinenetwork.offline();
            }
            this.handlerFired = true;
        },
        //http请求
        XMLHttpLogic:function (async) {
            var url = this.getOnLineCheckURL(),
                self = this;
            if(async){
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4) {
                        try {
                            self.processXmlhttpStatus();
                        } catch (err) {
                            self.setStatus(false);
                        }
                    }
                };
            }else{
                xmlhttp.onreadystatechange = undefined;
            }
            xmlhttp.open("HEAD", url, async)
            this.tryToSend(xmlhttp);
        },
        processXmlhttpStatus: function () {
            var tempOnLine = this.verifyStatus(xmlhttp.status);
            this.setStatus(tempOnLine);
        },
        //尝试发送请求
        tryToSend:function (xmlhttprequest) {
            try {
                xmlhttprequest.send();
            } catch(e) {
                this.setStatus(false);
            }
        },
        //确认状态
        verifyStatus:function (status) {
            return status === 200;
        },
        //url加上随机数
        getOnLineCheckURL: function () {
            return url + '?' + Math.floor(Math.random() * 1000000);
        },
        //非 chrome 和 Safari 浏览器不停的检查，嘿嘿
        startCheck:function(){
            var self = this
            setInterval(function(){
                self.XMLHttpLogic(true)
            },time);
        },
        //第一次检查是否在线
        checkOnLine:function(){
            this.XMLHttpLogic(false)
        },
        getStatusFromNavigatorOnLine:function () {
            if (w.navigator.onLine !== undefined) {
                this.setStatus(w.navigator.onLine);
            } else {
                this.setStatus(true);
            }
        },
        //判断浏览器
        getExplorer: function(newStatus){
            var explorer = window.navigator.userAgent;
            this.setStatus(newStatus)
            console.log(explorer)
            console.log(url)
            if((explorer.indexOf('Firefox') >= 0 || explorer.indexOf('MSIE') >= 0)&&url){
                console.log("getExplorer:1")
                this.checkOnLine()
                this.setStatus(newStatus)
                this.startCheck(newStatus)
            }else{
                console.log("getExplorer:2")
                this.eventStatus(newStatus)
            }
        },
        //绑定事件
        addEvent: function (obj, type, callback) {
            if (window.attachEvent) obj.attachEvent('on' + type, callback);
            else obj.addEventListener(type, callback);
        },
        init:function(){

            var self = this
            //获取当前状态
            this.addEvent(w, 'load', function () {
                self.eventStatus(w.onLine);
            });

            //侦听 online 事件
            this.addEvent(w, 'online', function () { self.getExplorer(true) });

            //侦听 offline 事件
            this.addEvent(w, 'offline', function () { self.getExplorer(false) });

            self.getExplorer(true) 
            this.handlerFired = false;
        }
    }

    onlinenetwork=function (json){
        if(json){
            if (json.time) time=json.time;
            if (json.url) url=json.url;
        }
        OL.init()
        for (var a in OL.OL_api) this[a]=OL.OL_api[a];
        return this
    }
    w.onlinenetwork=onlinenetwork
})(window);