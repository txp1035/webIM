/*页面加载*/
window.onload = function() {
	//绑定按钮
    $(document).keydown(function(event){
        if (event.keyCode ==13 && event.ctrlKey) {
            sendClick();
        }
    }); 
    setMainMargin();//动态设置聊天窗口的margin
    $("#file").change(function(){
        if (curAcceptMsgObjType == "chat") {
            sendPrivatePicture("file");
        }else if (curAcceptMsgObjType == "groupchat") {
            sendGroupPicture("file");
        }
    })
	$("#login").click(loginClick);
	$("#register").click(registerClick);
	$("#logout").click(logoutClick);
	$("#getRoasters").click(getRoasters);
	$("#loginPage-registerPage").click(divHide);
	$("#registerPage-loginPage").click(divHide);
	$("#group_msg-friend").click(function(){
        $("#friend_msg-group").css("background-position","-376px -322px")
        $("#friend_group-msg").css("background-position","-150px -96px")
        $("#group_msg-friend").css("background-position","-304px -246px")
        divHide(this);
    });
	$("#friend_msg-group").click(function(){
        $("#friend_msg-group").css("background-position","-304px -281px")
        $("#friend_group-msg").css("background-position","-150px -96px")
        $("#group_msg-friend").css("background-position","-220px -96px")
        divHide(this);
    });
	$("#friend_group-msg").click(function(){
        $("#friend_msg-group").css("background-position","-376px -322px")
        $("#friend_group-msg").css("background-position","-185px -96px")
        $("#group_msg-friend").css("background-position","-220px -96px")
        divHide(this);
    });
	$("#send").click(sendClick);  
    $(".chat-box-hd a").click(chatMenuClick)
    $(".list-menu").click(listMenuClick);
    $("#addFriend").click(addFriendsClick);
    $("#createGroup").click(createGroupsClick);
    $(".face").click(faceBoxClick)
    $(".face li").click(function(){chooseFaceClick(this);})
    $("#addGroup").click(joinGroupsClick);
};

// 界面样式全局变量
var mainPage = ".main";//主界面
var nikeName = ".nikename";//用户昵称
var loginPage = "#loginPage";//登录界面
var friendList = "#friend";//好友列表
var groupList = "#group";//群组列表
var chatBoxContent = "#chat-box-content";//聊天盒子内容容器
var chatObj = ".chat-box-hd span";//聊天对象名字
var textMsg = "#text";//需要发送的消息
var chatBox = ".chat-box";//聊天盒子
var chatCover = ".chat-cover";//聊天封面
// var fileInput = "file";

/*基本功能*/
var conn = new WebIM.connection({
	https: WebIM.config.https,
	// https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
	isAutoLogin: WebIM.config.isAutoLogin,
	isMultiLoginSessions: WebIM.config.isMultiLoginSessions
	// heartBeatWait: WebIM.config.heartBeatWait,
	// autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	// autoReconnectInterval: WebIM.config.autoReconnectInterval
});// 创建连接
conn.listen({
	onOpened: function(message) { //连接成功回调
		// 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
		// 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
		// 则无需调用conn.setPresence();       
		// 连接成功才可以发送消息      
		console.log("%c [opened] 连接已成功建立", "color: green");
		handleOpen(conn);

	},
	onClosed: function(message) {}, //连接关闭回调
	onTextMessage: function(message) {
		// 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
        handleTextMessage(message);
	}, //收到文本消息
	onEmojiMessage: function(message) {
		// 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
		// 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
		// 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
		console.log('表情');
		var data = message.data;
		for(var i = 0, l = data.length; i < l; i++) {
			console.log(data[i]);
		}
	}, //收到表情消息
	onPictureMessage: function(message) {
		console.log('图片');
		var options = {
			url: message.url
		};
		options.onFileDownloadComplete = function() {
			// 图片下载成功
            var msgObjDivId = null;
            var listObjIId = null;
            if (message.type == "chat") {
                msgObjDivId = "ChatRosters-"+message.from;
                listObjIId = "ListRosters-" +message.from;
            }else if (message.type == "groupchat") {
                msgObjDivId = "ChatGroups-"+message.to;
                listObjIId = "ListGroups-"+message.to;
            }
            // 把接受的消息添加进消息盒子中
            var chatdiv = $('<div>').attr({
                'class': 'otherMsg'
            });
            $('<img>').attr({
                'src': './demo/img/bb.jpg',
                'width': '40px',
                'height': '40px',
                'id':'limg'
            }).appendTo(chatdiv);
            console.log(message);
            $('<h4>').text(message.from).appendTo(chatdiv);
            var span = $('<span>').appendTo(chatdiv);
            $('<img>').attr({
                'src': message.url,
                'width': '300px',
            }).appendTo(span);
            $('#' + msgObjDivId).append(chatdiv);
            // 小红点添加
            if (curAcceptMsgObjDivId == null  || msgObjDivId != curAcceptMsgObjDivId) {
                if(msgObjDivId in redPCache) {
                    var redIVal = $("#"+listObjIId + " i").text();
                    redIVal = parseInt(redIVal) + 1;
                    $("#"+listObjIId + " i").text(redIVal);
                } else {
                    var redI = $('<i>').attr({
                        "id": "redP-" + msgObjDivId
                    }).text(1);
                    $("#" + listObjIId).append(redI);
                    redPCache[msgObjDivId] = true;
                };
            }
			console.log('图片下载成功!');
            console.log(message);

           
		};
		options.onFileDownloadError = function() {
			// 图片下载失败
			console.log('图片下载失败!');
		};
		WebIM.utils.download.call(conn, options); // 意义待查
	}, //收到图片消息
	onCmdMessage: function(message) {
		console.log('收到命令消息');
	}, //收到命令消息
	onAudioMessage: function(message) {
		console.log("收到音频消息");
	}, //收到音频消息
	onLocationMessage: function(message) {
		console.log("收到位置消息");
	}, //收到位置消息
	onFileMessage: function(message) {
		console.log("收到文件消息");
	}, //收到文件消息
	onVideoMessage: function(message) {
		var node = document.getElementById('privateVideo');
		var option = {
			url: message.url,
			headers: {
				'Accept': 'audio/mp4'
			},
			onFileDownloadComplete: function(response) {
				var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
				node.src = objectURL;
			},
			onFileDownloadError: function() {
				console.log('文件下载失败.')
			}
		};
		WebIM.utils.download.call(conn, option);
	}, //收到视频消息
	onPresence: function(message) {
		handlePresence(message);
	}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
	onRoster: function(message) {
		console.log('处理好友申请');
	}, //处理好友申请
	onInviteMessage: function(message) {
		console.log('处理群组邀请');
	}, //处理群组邀请
	onOnline: function() {
		console.log('本机网络连接成功');
	}, //本机网络连接成功
	onOffline: function() {
		console.log('本机网络掉线');
	}, //本机网络掉线
	onError: function(message) {
		console.log('失败回调');
		console.log(message);
		$(mainPage).addClass("hide");
		$(loginPage).removeClass("hide");
		if(message && message.type == 1) {
			console.warn('连接建立失败！请确认您的登录账号是否和appKey匹配。')
		}
	}, //失败回调
	onBlacklistUpdate: function(list) { //黑名单变动
		// 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
		console.log(list);
	},
	onReceivedMessage: function(message) {

	}, //收到消息送达客户端回执
	// onDeliveredMessage: funciton(message){},   //收到消息送达服务器回执
	onReadMessage: function(message) {}, //收到消息已读回执
	onCreateGroup: function(message) {}, //创建群组成功回执（需调用createGroupNew）
	onMutedMessage: function(message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
	// onBlacklistUpdate: function (list) {
	//     // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
	//     console.log(list);
	// }     // 黑名单变动
});// 回调函数

/*回调函数实现的功能*/
var handleOpen = function(conn) {
    //从连接中获取到当前的登录人注册帐号名
    curUserId = conn.context.userId;
    $(nikeName).text(curUserId);  
    $(loginPage).addClass("hide");
    $(mainPage).removeClass("hide");
    getRoasters();
    getGroups();
};// 处理连接时
var handlePresence = function(message){
    switch(message.type) {
        case 'joinGroupNotifications':
            console.log(message);
            var a = confirm("入群申请 : "+message.from+"想加入你的群");
            var options = {
                applicant: message.from,
                groupId: message.gid,
                success: function(resp){
                    console.log(resp);
                },
                error: function(e){}
            };
            if (a) {  
                conn.agreeJoinGroup(options);
            }else{
                conn.rejectJoinGroup(options);
            }
            break;
        case 'subscribe': // 对方请求添加好友
            var a = confirm("好友申请 : "+message.status);
            // $("#selectMsg").text("好友申请 : "+message.status);
            // $("#selectdModal").modal();
            if (a) {// 同意对方添加好友
                conn.subscribed({
                    to: message.from,
                    message: "[resp:true]"
                });
            }else{
                conn.unsubscribed({
                    to: message.from,
                    message: "残忍的拒绝了你的好友请求" // 拒绝添加好友回复信息
                });
            }// 拒绝对方添加好友    
            
            break;
        case 'subscribed': // 对方同意添加好友，已方同意添加好友
            $("#remindMsg").text("成功添加"+message.from+"为好友");
            $("#remindModal").modal();
            var id = 'ListRosters-'+message.from;
            var hidename = message.from;
            var displayname = hidename;
            var type = 'chat';
            var src = "./demo/img/bb.jpg"
            var chatId = 'ChatRosters-'+message.from;
            appendListDiv(id,hidename,displayname,type,friendList,src);
            appendChatDiv(chatId,chatBoxContent);
            break;
        case 'unsubscribe': // 对方删除好友
            console.log(message);
            break;
        case 'unsubscribed': // 被拒绝添加好友，或被对方删除好友成功
            $("#remindMsg").text(message.from+message.status);
            $("#remindModal").modal();
            break;
        case 'memberJoinPublicGroupSuccess': // 成功加入聊天室
            console.log('join chat room success');
            break;
        case 'joinChatRoomFaild': // 加入聊天室失败
            console.log('join chat room faild');
            break;
        case 'joinPublicGroupSuccess': // 意义待查
            console.log('join public group success', message.from);
            break;
        case 'createGroupACK':
            conn.createGroupAsync({
                from: message.from,
                success: function(option) {
                    console.log('Create Group Succeed');
                }
            });
            break;
    }
}//处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
var getRoasters = function() {
    var option = {
        success: function(roster) {
            // roster是所有好友，格式为：
            /*
             [
             {
             jid:"easemob#chatdemoui_test1@easemob.com",
             name:"test1",
             subscription: "both"
             // subscription的值的集合是{both, to, from, none},
             // both表示互相在对方的好友列表中，
             // to 和 from意义待定
             // 如果添加对方为好友被拒绝则为none
             }
             ]
             */
            // var curroster;
            for(var o in roster) {
                var ros = roster[o];
                // both为双方互为好友，要显示的联系人,from我是对方的单向好友
                if(ros.subscription == 'both' || ros.subscription == 'from') {
                    bothRoster.push(ros);
                } else if(ros.subscription == 'to') {
                    //to表明了联系人是我的单向好友
                    toRoster.push(ros);
                }
            }
            if(bothRoster.length > 0) {
                buildListRostersDiv(bothRoster); //联系人列表页面处理
                buildChatRostersDiv(bothRoster);
            }
        }
    };
    conn.getRoster(option);
};// 显示好友（需要插入昵称和头像）
var getGroups = function() {
    var option = {
        success: function(rooms) {
            if(rooms.length > 0) {
                buildListGroupsDiv(rooms); //群组列表页面处理
                buildChatGroupsDiv(rooms);
            }
        },
        error: function() {
            console.log('显示群组错误');
        }
    };
    conn.listRooms(option);
};// 显示群组（需要插入头像）
var buildListRostersDiv = function(roster) {
    // 建立缓存，存好友，用处是下面判断是一个好友则跳出当前循环
    var cache = {};
    for(i = 0; i < roster.length; i++) {
        if(!(roster[i].subscription == 'both' || roster[i].subscription == 'from')) {
            continue;
        }
        var userName = roster[i].name;
        var id = "ListRosters-"+userName;
        var displayname = userName;//应该传入昵称
        var type = "chat";
        var obj = friendList;
        var imgSrc = "./demo/img/bb.jpg";
        if(userName in cache) {
            continue;
        }
        cache[userName] = true;
        appendListDiv(id,userName,displayname,type,obj,imgSrc);
    }
};// 构建好友列表
var buildChatRostersDiv = function(roster) {
    for(i = 0; i < roster.length; i++) {
        var id = 'ChatRosters-'+roster[i].name;
        appendChatDiv(id,chatBoxContent);
    }
}// 构建好友聊天盒子
var buildListGroupsDiv = function(groups) {
    var cache = {};
    for(i = 0; i < groups.length; i++) {
        var roomsName = groups[i].name;
        var roomId = groups[i].roomId;
        var id = "ListGroups-"+roomId;
        var type = "groupchat";
        var obj = groupList;
        var imgSrc = './demo/img/group_normal.png';
        if(roomId in cache) {
            continue;
        }
        cache[roomId] = true;
        appendListDiv(id,roomId,roomsName,type,obj,imgSrc);
    }
};// 构建群组列表
var buildChatGroupsDiv = function(groups){
    for(i = 0; i < groups.length; i++) {
        var id = 'ChatGroups-'+groups[i].roomId;
        appendChatDiv(id,chatBoxContent);
    }
};// 构建群组聊天盒子
var appendListDiv = function(id,hidename,displayname,type,obj,src){
    var aelem = $('<a>').attr({
        "href":"JavaScript:;",
        'id': id,
        'type': type,
        'hidename': hidename,
        'displayname': displayname
    }).click(function() {
        chooseListDivClick(this);
    });
    $('<img>').attr("src", src).attr("width", "40px").attr("height", "40px").appendTo(
        aelem);
    $('<span>').html(displayname).appendTo(aelem);
    $(obj).append(aelem);
};//动态插入列表
var appendChatDiv = function(id,obj){
    var chatdiv = $('<div>').attr({
        'id': id,
        'class': 'chat-box-content hide',
    });
    $(obj).append(chatdiv);
};//动态插入聊天盒子
var handleTextMessage = function(message){
    var msgObjDivId = null;
    var listObjIId = null;
    if (message.type == "chat") {
        msgObjDivId = "ChatRosters-"+message.from;
        listObjIId = "ListRosters-" +message.from;
    }else if (message.type == "groupchat") {
        msgObjDivId = "ChatGroups-"+message.to;
        listObjIId = "ListGroups-"+message.to;
    }
    // 把接受的消息添加进消息盒子中
    var chatdiv = $('<div>').attr({
        'class': 'otherMsg'
    });
    $('<img>').attr({
        'src': './demo/img/bb.jpg',
        'width': '40px',
        'height': '40px',
        "id": 'limg'
    }).appendTo(chatdiv);
    console.log(message);
    $('<h4>').text(message.from).appendTo(chatdiv);
    $('<span>').html(message.data).appendTo(chatdiv);
    $('#' + msgObjDivId).append(chatdiv);
    // 小红点添加
    if (curAcceptMsgObjDivId == null  || msgObjDivId != curAcceptMsgObjDivId) {
        if(msgObjDivId in redPCache) {
            var redIVal = $("#"+listObjIId + " i").text();
            redIVal = parseInt(redIVal) + 1;
            $("#"+listObjIId + " i").text(redIVal);
        } else {
            var redI = $('<i>').attr({
                "id": "redP-" + msgObjDivId
            }).text(1);
            $("#" + listObjIId).append(redI);
            redPCache[msgObjDivId] = true;
        };
    }
    
    // console.log(message);
};//处理接受文字消息

/*基本API*/
var register = function(username,password,nickname) {
	var options = {
		username: username, //填入用户名
		password: password, //填入密码
		nickname: nickname, //填入昵称
		appKey: WebIM.config.appkey,
		success: function() {
			console.log('注册成功!');
		},
		error: function() {
			console.log('注册失败!');
		},
		apiUrl: WebIM.config.apiURL
	};
	conn.registerUser(options);
};// 注册
var login = function(user,pwd) {
	var options = {
		apiUrl: WebIM.config.apiURL,
		user: user,
		pwd: pwd,
		appKey: WebIM.config.appkey
	};
	conn.open(options);
};// 登录
var logout = function() {
	conn.close();
};// 退出
var sendPrivateText = function(text, obj) {
    var id = conn.getUniqueId();
    var msg = new WebIM.message('txt', id);
    msg.set({
        msg: text, // 消息内容
        to: obj, // 接收消息对象
        roomType: false,
        success: function(id, serverMsgId) {
            console.log("发送私聊信息成功");
        },
        fail: function(e) {
            console.log("发送私聊信息失败");
        }
    });
    msg.body.chatType = 'singleChat';
    conn.send(msg.body);
};// 私聊发送文本消息，发送表情同发送文本消息，只是会在对方客户端将表情文本进行解析成图片
var sendGroupText = function (text, obj) {
    var id = conn.getUniqueId();            // 生成本地消息id
    var msg = new WebIM.message('txt', id); // 创建文本消息
    var option = {
        msg: text,             // 消息内容
        to: obj,                     // 接收消息对象(群组id)
        roomType: false,
        chatType: 'chatRoom',
        success: function () {
            console.log('发送群信息成功');
        },
        fail: function () {
            console.log('发送群信息失败');
        }
    };
    msg.set(option);
    msg.setGroup('groupchat');
    conn.send(msg.body);
};// 群组发送文本消息
var sendPrivatePicture = function(obj){
            var id = conn.getUniqueId();
            var msg = new WebIM.message('img', id);
            var input = document.getElementById(obj);               // 选择图片的input
            var file = WebIM.utils.getFileUrl(input);                   // 将图片转化为二进制文件
            var allowType = {
                'jpg': true,
                'gif': true,
                'png': true,
                'bmp': true
            };

            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: curAcceptMsgObj,
                roomType: false,
                chatType: 'singleChat',
                onFileUploadError: function () {
                    console.log('onFileUploadError');
                },
                onFileUploadComplete: function (data) {
                    console.log('onFileUploadComplete');
                    console.log(data);
                    var chatdiv = $('<div>').attr({
                        'class': 'myMsg'
                    });
                    $('<img>').attr({
                        'src': './demo/img/tx.jpg',
                        'width': '40px',
                        'height': '40px',
                        'id': 'rimg'
                    }).appendTo(chatdiv);
                    var text = $("#text").text();
                    var span = $('<span>').appendTo(chatdiv);
                    $('<img>').attr({
                        'src': data.uri+"/"+data.entities[0].uuid,
                        'width': '300px',
                        
                    }).appendTo(span);
                    $('#'+curAcceptMsgObjDivId).append(chatdiv);
                },
                success: function () {
                    console.log('Success');
                },
            };
            // for ie8
            try {
                if (!file.filetype.toLowerCase() in allowType) {
                    console.log('file type error')
                    return
                }
            } catch (e) {
                option.flashUpload = WebIM.flashUpload
            }
            msg.set(option);
            conn.send(msg.body);
}//私聊发送图片
var sendGroupPicture = function(obj){
            var id = conn.getUniqueId();
            var msg = new WebIM.message('img', id);
            var input = document.getElementById(obj);               // 选择图片的input
            var file = WebIM.utils.getFileUrl(input);                   // 将图片转化为二进制文件
            var allowType = {
                'jpg': true,
                'gif': true,
                'png': true,
                'bmp': true
            };

            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: curAcceptMsgObj,
                roomType: false,
                chatType: 'chatRoom',
                onFileUploadError: function () {
                    console.log('onFileUploadError');
                },
                onFileUploadComplete: function (data) {
                    console.log('onFileUploadComplete');
                    console.log(data);
                    var chatdiv = $('<div>').attr({
                        'class': 'myMsg'
                    });
                    $('<img>').attr({
                        'src': './demo/img/tx.jpg',
                        'width': '40px',
                        'height': '40px',
                        'id': 'rimg'
                    }).appendTo(chatdiv);
                    var text = $("#text").text();
                    var span = $('<span>').appendTo(chatdiv);
                    $('<img>').attr({
                        'src': data.uri+"/"+data.entities[0].uuid,
                        'width': '300px',
                        
                    }).appendTo(span);
                    $('#'+curAcceptMsgObjDivId).append(chatdiv);
                },
                success: function () {
                    console.log('Success');
                },
            };
            // for ie8
            try {
                if (!file.filetype.toLowerCase() in allowType) {
                    console.log('file type error')
                    return
                }
            } catch (e) {
                option.flashUpload = WebIM.flashUpload
            }
            msg.set(option);
            msg.setGroup('groupchat');
            conn.send(msg.body);
}//群聊发送图片
var addFriends = function(name,msg) {
    if (name != null && name != "") {
        conn.subscribe({
            to: name,
            // Demo里面接收方没有展现出来这个message，在status字段里面
            message: msg
        });
    }
};// 添加好友
var removeFriends = function (obj) {
    conn.removeRoster({
        to: obj,
        success: function () {  // 删除成功
            conn.unsubscribed({
                to: obj
            });
        },
        error: function () {    // 删除失败
        }
    });
};//删除好友
var createGroups = function(value,info,members,pub,opM,opA){
    var options = {
            subject: value,// 群名称
            description: info,// 群简介
            members: members,// 以数组的形式存储需要加群的好友ID
            optionsPublic: pub,// 是否允许任何人加入
            optionsModerate: opM,// 加入是否需审批
            // optionsMembersOnly: true,                  // 是否允许任何人主动加入
            optionsAllowInvites: opA,// 是否允许群人员邀请
        success: function (respData) {},
        error: function () {}
        };
    conn.createGroup(options);
};//创建群
var joinGroups = function(groupId){
    var options = {
        groupId: groupId,
        success: function(resp) {
            console.log("成功加入群的resp: ", resp);
        },
        error: function(e) {
            if(e.type == 17){
                console.log("您已经在这个群组里了");
            }
        }
    };
    conn.joinGroup(options);
}//添加群
var leaveGroup = function (user,groupid) {
    var option = {
        to: user,
        roomId: groupid,
        success: function () {
            console.log('你成功离开了群!');
        },
        error: function () {
            console.log('离开群失败');
        }
    };
    conn.leaveGroupBySelf(option);
};// 成员主动退出群
var getGroupInfo = function(gid){
    var options = {
    groupId: gid,
    success: function(resp){
        console.log("Response: ", resp);
    },
    error: function(){}
    };
    conn.getGroupInfo(options);
}//获取群组信息
var getGroupAdmin = function(gid){
    var pageNum = 1,
    pageSize = 1000;
    var options = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: gid,
        success: function (resp) {console.log("Response: ", resp.data[resp.data.length-1].owner)},
        error: function(e){}
    };
    conn.listGroupMember(options);
}//获取群组下所有管理员

var curUserId = null;
var curAcceptMsgObj = null; //当前接受消息对象
var curAcceptMsgObjType = null;//当前接受消息对象类型
var curAcceptMsgObjDivId = null; //当前接受消息对象Divid
var curChatGroupId = null; //
var bothRoster = []; //好友id
var toRoster = []; //到好友id
var redPCache = {};

/*点击事件*/
var registerClick = function(){
    var a = $("#username").val();
    var b = $("#password").val();
    var c = $("#nickname").val();
    register(a,b,c);
};//点击注册事件
var loginClick = function(){
    var a = $("#user").val();
    var b = $("#pwd").val();
    login(a,b);
};//点击登录按钮事件
var logoutClick = function() {
    logout();
    window.location.reload();
};//点击登出事件
var listMenuClick =function(){
    $(".list-menu ul").toggleClass("hide");
};// 点击列表菜单事件
var addFriendsClick = function(){
    var name = $("#addFriendName").val();
    var msg = $("#addFriendMsg").val();
    addFriends(name,msg);
};//点击添加好友事件
var chatMenuClick = function(){
    $(".chat-box-hd a ul").empty();
    if (curAcceptMsgObjType == "chat") {
        var li = $('<li>').attr({
            "id" : "removeFriends",
            "class" : "list-group-item"
        }).text("删除好友").click(removeFriendsClick);
        $(".chat-box-hd a ul").append(li);
    }else if (curAcceptMsgObjType == "groupchat") {
        var id = $("#"+curAcceptMsgObjDivId.replace(/Chat/,"List")).attr("hidename");
        var lia = $('<li>').attr({
            "class" : "list-group-item"
        }).text("群ID："+id);
        var li = $('<li>').attr({
            "id" : "quitGroups",
            "class" : "list-group-item"
        }).text("退出群组").click(leaveGroupClick);
        $(".chat-box-hd a ul").append(li);
        $(".chat-box-hd a ul").append(lia);
        getGroupAdmin(id);
    }
    $(".chat-box-hd a ul").toggleClass("hide");
};// 点击聊天菜单事件
var removeFriendsClick = function(){
    removeFriends(curAcceptMsgObj);
    var a = curAcceptMsgObjDivId.replace(/Chat/,"List");
    $("#"+curAcceptMsgObjDivId).remove();
    $("#"+a).remove();
    $(chatBox).addClass("hide");
    $(chatCover).removeClass("hide");
    curAcceptMsgObjDivId = null;
    curAcceptMsgObj = null;
    curAcceptMsgObjType = null;
};//点击删除好友事件
var leaveGroupClick = function(){
    var a = curAcceptMsgObjDivId.replace(/Chat/,"List");
    var id = $("#"+a).attr("hidename");
    leaveGroup(curUserId,id);
    $("#"+curAcceptMsgObjDivId).remove();
    $("#"+a).remove();
    $(chatBox).addClass("hide");
    $(chatCover).removeClass("hide");
    curAcceptMsgObjDivId = null;
    curAcceptMsgObj = null;
    curAcceptMsgObjType = null;
};//点击退出群组事件
var createGroupsClick = function(){
    var value = $("#createGroupName").val();
    var info = $("#createGroupInfo").val();
    var members = [curUserId];
    createGroups(value,info,members,true,true,true);
};//点击创建群事件
var joinGroupsClick = function(){
    var id = $("#addGroupId").val();
    joinGroups(id);
}//点击添加群事件
var faceBoxClick = function(){
    $(".face ul").toggleClass("hide");
};//表情盒子点击事件
var sendClick = function() {
    var html = $("#text").html();
    if (html != null && html != "") {
        if (curAcceptMsgObjType == "chat") {  
            sendPrivateText(html, curAcceptMsgObj);
        }else if(curAcceptMsgObjType == "groupchat"){
            sendGroupText(html, curAcceptMsgObj);
        }
        // 把发送的消息添加进消息盒子中
        var chatdiv = $('<div>').attr({
            'class': 'myMsg'
        });
        $('<img>').attr({
            'src': './demo/img/tx.jpg',
            'width': '40px',
            'height': '40px',
            'id':'rimg'
        }).appendTo(chatdiv);
        var text = $("#text").html();
        $('<span>').html(text).appendTo(chatdiv);
        $('#'+curAcceptMsgObjDivId).append(chatdiv);
        // 清空输入框内容
        $(textMsg).text("");
    }  
};// 点击发送按钮处理的事件
var chooseFaceClick =function (li){
    
    var a = $(li).html();
    // console.log(a);
    var text0 = $(li).attr('key');
    var text1 = $("#text").text();
     // $("#text").text(text1+text0+a);
    $("#text").append(a);
    var b =WebIM.utils.parseEmoji(text0);
    console.log(b);
};//选择表情事件


var divHide = function(e) {
	var name = $(e).attr('id');
	var x = name.split("-");
	var y = x[0].split("_");
	var a = x[1];

	for(var i = 0; i < y.length; i++) {
		$("#" + y[i]).addClass("hide");
	}
	// $("#"+x[0]).addClass("hide");
	$("#" + a).removeClass("hide");
};// div的隐藏与显示，用-分割显示与隐藏的集合id，用_表示分割集合中的id，例如：id1_id2_id3-id4表示隐藏id1、id2、id3显示id4
var chooseListDivClick = function(li) {
	var chooseObjId = li.id; 
    var chooseObjDivId = chooseObjId.replace(/List/,"Chat");
    var chooseAcceptMsgObj = $("#"+chooseObjId).attr('hidename');
    // 如果当前接受消息对象id为空
    if (curAcceptMsgObj == null && curAcceptMsgObjDivId == null) { 
        $(chatCover).addClass("hide");
        $(chatBox).removeClass("hide");
    }else{
        $("#"+curAcceptMsgObjDivId.replace(/Chat/,"List")).removeClass("listColor");//影藏上一个焦点背景颜色
        $("#"+curAcceptMsgObjDivId).addClass("hide");//影藏上一个对象聊天div
    }
    if (chooseObjDivId in redPCache) {
        $("#redP-" + chooseObjDivId).remove();//删除红点
        delete redPCache[chooseObjDivId];
    }
    $(chatObj).text($(li).attr("displayName"));//显示当前对象聊天名字
    $("#"+chooseObjId).addClass("listColor");//显示焦点背景颜色
    $("#"+chooseObjDivId).removeClass("hide");//显示当前对象聊天div
    curAcceptMsgObjDivId = chooseObjDivId;
    curAcceptMsgObj = chooseAcceptMsgObj;
    curAcceptMsgObjType = li.type;
};//选择列表事件

var buildCreateGroupsDiv = function(){
} 

var setMainMargin = function(){
    if ($(window).height() <= 750) {
        $(".main").attr("style","margin-top:0px;");
    }else if ($(window).height() > 750) {
        $(".main").attr("style","margin-top:100px;");
    }    
    $(window).resize(function(){
        if ($(window).height() <= 750) {
            $(".main").attr("style","margin-top:0px;");
        }else if ($(window).height() > 750) {
            $(".main").attr("style","margin-top:100px;");
        }
    });
};//动态设置聊天窗口的margin










