# webIM-jQuery
### 测试账号和地址
* demo地址：[http://shawdanon.github.io/webIM/jQuery/index.html](http://shawdanon.github.io/webIM/jQuery/index.html)
* 用户名：123 
* 密码：123 
* 用户名：456 
* 密码：456 
* 关于版本及兼容问题：jQuery1.12.4;Bootstrap3.3.7
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
### 第二天
1、增加tWebIM的命名空间，对方法属性分类。property保存属性，easemob保存环信接口，dom保存页面操作方法。
2、使用DocumentFragment来渲染用户列表，提高性能。避免遍历作用域链来提高性能。
3、使用JSDoc规范注释。
4、通过组件思想来优化列表渲染方案。这有在建立群组列表就不需要建立构建群组列表方法了。
```
优化前：
var buildListRostersDiv = function(data) {
    // 建立缓存，存好友，用处是下面判断是一个好友则跳出当前循环
    var cache = {};
    for(i = 0; i < data.length; i++) {
        if(!(data[i].subscription == 'both' || data[i].subscription == 'from')) {
            continue;
        }
        var userName = data[i].name;
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
优化后：
/**
 * @desc 模拟用户列表组件 
 * @param  {Object} data 单个数据
 * @param  {Object} obj 虚拟的节点对象
 */
componentUserList: function (data, obj) {
    var aelem = $('<a>').attr({
        "href": "JavaScript:;",
        'id': data.id,
        // 'type': type,
        // 'hidename': hidename,
        // 'displayname': displayname
    }).click(function () {
        chooseListDivClick(this);
    });
    $('<img>').attr("src", "./demo/img/bb.jpg").attr("width", "40px").attr("height", "40px").appendTo(aelem);
    $('<span>').html(data.name).appendTo(aelem);
    $(obj).append(aelem);
},
/**
 * @desc 实例化组件 
 * @param  {Function} component 组件
 * @param  {Array} data 数据集合
 * @param  {String} obj 渲染到元素id或类
 */
appendComponent: function (component, data, obj) {
    var fragment = document.createDocumentFragment();
    for (let i = 0, len = data.length; i < len; i++) {
        component(data[i], fragment);
    }
    $(obj).append(fragment);
}
```
### 第三天 
1、更改列表架构，第一个显示聊天列表第二个显示通讯录列表。（原来是第一个显示用户列表，第二个是群组列表）  
2、遇到问题：**实现通过拼音对通讯录用户排序**。
### 第四天
1、解决**实现通过拼音对通讯录用户排序**问题。解决步骤如下：
1. 首先需要把中文转换成拼音首字母。通过查找jquery.charfirst.pinyin.js能够解决。
2. 然后是把用户数据渲染到列表中。
3. 首先把用户渲染到列表中，获取列表元素，因为列表元素是数组，所以可以用sort进行排序。
4. 通过用户名首字母比较可以排出A到Z顺序的列表。
5. 通过遍历用户数据可以获得用户中A到Z的字母的数组。
6. 将字母渲染到列表里。
7. 再遍历用户，将用户放到对应字母后面。
8. 插入群组。
### 第五天
1、增加用户信息界面。
