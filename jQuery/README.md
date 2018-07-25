# webIM-jQuery
### 测试账号和地址
* demo地址：[http://shawdanon.github.io/webIM/jQuery/index.html](http://shawdanon.github.io/webIM/jQuery/index.html)
* 用户名：123 
* 密码：123 
* 用户名：456 
* 密码：456 
* 建议浏览器：谷歌
### 使用方法
1. fork到你的仓库
2. 打开sdk目录下webim.config.js文件修改appkey为你注册的appkey即可。
### 已经完成功能
1. 登录
2. 注册
3. 添加好友、删除好友
4. 创建群、添加群、退出群、解散群
5. 登录人名字和头像显示、好友列表显示、群组列表显示
6. 单人聊天（可以发送文字、图片、表情）、群组聊天（可以发送文字、图片、表情）
7. 小红点（接受到未读消息，会在头像上显示小红点）
### 觉得不错给颗星哦
### 欢迎提修改意见
# 重构jQuery项目
### 第一天
1、重构js架构，通过定义一个tWebIM全局对象，把属性和方法定义在tWebIM里面从而避免污染Window对象。
2、调整登录框和注册框为页面居中（使用绝对定位把盒子左上设置为50%，margin左上为负盒子宽度的一半和负盒子高度的一半）。  
3、重构divHide方法,前者需要对按钮id进行配置，后者直接传参即可。
```
//修改前：
function(e) {
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
//修改后：
function () {
    for (let i = 1, len = arguments.length; i < len; i++) {
        $(arguments[i]).addClass("hide");
    }
    $(arguments[0]).removeClass("hide");
}//传入参数为元素id或类例如#id或者.class,第一个参数所对应的元素会显示出来，其他参数所对应的元素会被影藏
```

