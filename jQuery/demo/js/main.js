//设置全局对象，避免污染全局变量
var tWebIM = {
    /**
     * 属性
     */
    /**
     * easemob对象
     * 环信接口集成
     */
    easemob: {
        coon: null,
        /**
         * @param  {string} username
         * @param  {string} password
         */
        login: function (username, password) {
            var options = {
                apiUrl: WebIM.config.apiURL,
                user: username,
                pwd: password,
                appKey: WebIM.config.appkey
            };
            this.conn.open(options);
        }
    },
    /**
     * encapsulation对象
     * 封装方法
     */
    encapsulation: {
        /**
         * divHide对象
         * 传入参数为元素id或类例如#id或者.class
         * 第一个参数所对应的元素会显示出来，其他参数所对应的元素会被影藏
         */
        divHide: function () {
            for (let i = 1, len = arguments.length; i < len; i++) {
                $(arguments[i]).addClass("hide");
            }
            $(arguments[0]).removeClass("hide");
        },
    }
};
window.onload = function () {
    $("#toregister").click(function () {
        tWebIM.encapsulation.divHide("#registerPage", "#loginPage");
    });
    $("#toLogin").click(function () {
        tWebIM.encapsulation.divHide("#loginPage", "#registerPage");
    });
    $("#login").click(function () {
        var username = $("#user").val();
        var password = $("#pwd").val();
        tWebIM.easemob.login(username, password);
    });


}
tWebIM.easemob.conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: true
}); //连接环信
tWebIM.easemob.conn.listen({
    onOpened: function (message) { //连接成功回调
        // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
        // 则无需调用conn.setPresence(); 
        console.log("连接成功")
        console.log(message)
        
        //从连接中获取到当前的登录人注册帐号名
        // curUserId = message.context.userId;
        // $(nikeName).text(curUserId);
        tWebIM.encapsulation.divHide(".main", "#loginPage");
    },
    onClosed: function (message) {}, //连接关闭回调
    onTextMessage: function (message) {}, //收到文本消息
    onEmojiMessage: function (message) {}, //收到表情消息
    onPictureMessage: function (message) {}, //收到图片消息
    onCmdMessage: function (message) {}, //收到命令消息
    onAudioMessage: function (message) {}, //收到音频消息
    onLocationMessage: function (message) {}, //收到位置消息
    onFileMessage: function (message) {}, //收到文件消息
    onVideoMessage: function (message) {
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIM.utils.download.call(conn, option);
    }, //收到视频消息
    onPresence: function (message) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {}, //处理好友申请
    onInviteMessage: function (message) {}, //处理群组邀请
    onOnline: function () {}, //本机网络连接成功
    onOffline: function () {}, //本机网络掉线
    onError: function (message) {}, //失败回调
    onBlacklistUpdate: function (list) { //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log(list);
    },
    onReceivedMessage: function (message) {}, //收到消息送达服务器回执
    onDeliveredMessage: function (message) {}, //收到消息送达客户端回执
    onReadMessage: function (message) {}, //收到消息已读回执
    onCreateGroup: function (message) {}, //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
}); //回调函数