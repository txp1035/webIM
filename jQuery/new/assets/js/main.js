//设置全局对象，避免污染全局变量
var tWebIM = {
  /**
   * 属性
   */
  property: {
    nikeName: '.nikename'
  },
  /**
   * @desc 环信接口集成
   * @namespace easemob
   */
  easemob: {
    coon: null,
    friends: [],
    groups: [],
    message: [],
    /**
     * @desc 登录接口
     * @param  {string} username 用户名
     * @param  {string} password 密码
     */
    login: function(username, password) {
      var options = {
        apiUrl: WebIM.config.apiURL,
        user: username,
        pwd: password,
        appKey: WebIM.config.appkey
      };
      this.conn.open(options);
    },
    /**
     * @desc 注册接口
     * @param  {string} username 用户名
     * @param  {string} password 密码
     * @param  {string} nickname 昵称
     */
    register: function(username, password, nickname) {
      var options = {
        username: username,
        password: password,
        nickname: nickname,
        appKey: WebIM.config.appkey,
        success: function() {},
        error: function() {},
        apiUrl: WebIM.config.apiURL
      };
      conn.registerUser(options);
    },
    /**
     * @desc 获取用户
     * @callback success(roster)
     */
    getRoster: function() {
      var options = {
        success: function(roster) {
          //获取好友列表，并进行好友列表渲染，roster格式为：
          /** [
                          {
                            jid:'asemoemo#chatdemoui_test1@easemob.com',
                            name:'test1',
                            subscription: 'both'
                          }
                        ]
                    */
          //避免遍历作用域链可以提高性能
          var friends = tWebIM.easemob.friends;
          for (var i = 0, l = roster.length; i < l; i++) {
            var ros = roster[i];
            //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
            if (ros.subscription === 'both' || ros.subscription === 'to') {
              friends.push(ros);
            }
          }
          console.log(tWebIM.easemob.friends);
          // tWebIM.dom.appendComponent(tWebIM.dom.componentChatList, tWebIM.easemob.friends, "#friend");
        },
        error: function() {
          Console.log('错误');
        }
      };
      this.conn.getRoster(options);
    }
  },
  /**
   * dom对象
   * 操作页面
   */
  dom: {
    setMainMargin: function() {
      if ($(window).height() <= 750) {
        $('.main').attr('style', 'margin-top:0px;');
      } else if ($(window).height() > 750) {
        $('.main').attr('style', 'margin-top:100px;');
      }
      $(window).resize(function() {
        if ($(window).height() <= 750) {
          $('.main').attr('style', 'margin-top:0px;');
        } else if ($(window).height() > 750) {
          $('.main').attr('style', 'margin-top:100px;');
        }
      });
    },
    /**
     * @desc 模拟用户列表组件
     * @param  {Object} data 单个数据
     * @param  {Object} obj 虚拟的节点对象
     */
    componentChatList: function(data, obj) {
      var element = $('<a>')
        .attr({
          href: 'JavaScript:;',
          id: data.id
          // 'type': type,
          // 'hidename': hidename,
          // 'displayname': displayname
        })
        .click(function() {
          chooseListDivClick(this);
        });
      $('<img>')
        .attr('src', './demo/img/bb.jpg')
        .attr('width', '40px')
        .attr('height', '40px')
        .appendTo(element);
      $('<span>')
        .html(data.name)
        .appendTo(element);
      $(obj).append(element);
    },
    /**
     * @param  {String} data 字母的值
     * @param  {Object} obj
     */
    componentAddressBookHeadList: function(data, obj) {
      var element = $('<i>')
        .attr({
          id: data
        })
        .text(data);
      $(obj).append(element);
    },
    componentAddressBookBodyList: function(data, obj) {
      var element = $('<a>')
        .attr({
          href: 'JavaScript:;',
          id: data.id
        })
        .click(function() {
          chooseListDivClick(this);
        });
      $('<img>')
        .attr('src', './demo/img/bb.jpg')
        .attr('width', '40px')
        .attr('height', '40px')
        .appendTo(element);
      $('<span>')
        .html(data.name)
        .appendTo(element);
      $(obj).append(element);
    },
    /**
     * @desc 实例化组件
     * @param  {Function} component 组件
     * @param  {Array} data 数据集合
     * @param  {String} obj 渲染到元素id或类
     */
    appendComponent: function(component, data, obj) {
      if (data.length === 0) {
        return;
      } //没有数据停止实例化组件
      var fragment = document.createDocumentFragment();
      for (let i = 0, len = data.length; i < len; i++) {
        component(data[i], fragment);
      }
      $(obj).append(fragment);
    }
  },
  /**
   * @desc 封装方法
   * @namespace encapsulation
   */
  encapsulation: {
    /**
     * divHide对象
     * 传入参数为元素id或类例如#id或者.class
     * 第一个参数所对应的元素会显示出来，其他参数所对应的元素会被影藏
     */
    divHide: function() {
      for (let i = 1, len = arguments.length; i < len; i++) {
        $(arguments[i]).addClass('hide');
      }
      $(arguments[0]).removeClass('hide');
    }
  },
  /**
   * @desc 普通方法
   */
  common: {
    renderingAddressBook: function() {
      //渲染通讯录列表用户
      tWebIM.dom.appendComponent(tWebIM.dom.componentAddressBookBodyList, tWebIM.easemob.friends, '#addressBook');
      var SortList = $('#addressBook a');
      var SortBox = $('#addressBook');
      //按首字母排序
      SortList.sort(asc_sort).appendTo(SortBox);

      function asc_sort(a, b) {
        return makePy(
          $(b)
            .find('span')
            .text()
            .charAt(0)
        )[0].toUpperCase() <
          makePy(
            $(a)
              .find('span')
              .text()
              .charAt(0)
          )[0].toUpperCase()
          ? 1
          : -1;
      }
      //获取通讯录用户首字母
      var initials = [];
      var num = 0;
      SortList.each(function(i) {
        var initial = makePy(
          $(this)
            .find('span')
            .text()
            .charAt(0)
        )[0].toUpperCase();
        if (initial >= 'A' && initial <= 'Z') {
          if (initials.indexOf(initial) === -1) initials.push(initial);
        } else {
          num++;
        }
      });
      if (tWebIM.easemob.groups.length > 0) {
        initials.push('群组');
      }
      //渲染通讯录列表头部
      tWebIM.dom.appendComponent(tWebIM.dom.componentAddressBookHeadList, initials, '#addressBook');
      //遍历用户，将用户放在列表头下面
      for (var i = 0; i < SortList.length; i++) {
        var letter = makePy(
          SortList.eq(i)
            .find('span')
            .text()
            .charAt(0)
        )[0].toUpperCase();
        switch (letter) {
          case 'A':
            $('#A').after(SortList.eq(i));
            break;
          case 'B':
            $('#B').after(SortList.eq(i));
            break;
          case 'C':
            $('#C').after(SortList.eq(i));
            break;
          case 'D':
            $('#D').after(SortList.eq(i));
            break;
          case 'E':
            $('#E').after(SortList.eq(i));
            break;
          case 'F':
            $('#F').after(SortList.eq(i));
            break;
          case 'G':
            $('#G').after(SortList.eq(i));
            break;
          case 'H':
            $('#H').after(SortList.eq(i));
            break;
          case 'I':
            $('#I').after(SortList.eq(i));
            break;
          case 'J':
            $('#J').after(SortList.eq(i));
            break;
          case 'K':
            $('#K').after(SortList.eq(i));
            break;
          case 'L':
            $('#L').after(SortList.eq(i));
            break;
          case 'M':
            $('#M').after(SortList.eq(i));
            break;
          case 'N':
            $('#N').after(SortList.eq(i));
            break;
          case 'O':
            $('#O').after(SortList.eq(i));
            break;
          case 'P':
            $('#P').after(SortList.eq(i));
            break;
          case 'Q':
            $('#Q').after(SortList.eq(i));
            break;
          case 'R':
            $('#R').after(SortList.eq(i));
            break;
          case 'S':
            $('#S').after(SortList.eq(i));
            break;
          case 'T':
            $('#T').after(SortList.eq(i));
            break;
          case 'U':
            $('#U').after(SortList.eq(i));
            break;
          case 'V':
            $('#V').after(SortList.eq(i));
            break;
          case 'W':
            $('#W').after(SortList.eq(i));
            break;
          case 'X':
            $('#X').after(SortList.eq(i));
            break;
          case 'Y':
            $('#Y').after(SortList.eq(i));
            break;
          case 'Z':
            $('#Z').after(SortList.eq(i));
            break;
          default:
            $('#default').after(SortList.eq(i));
            break;
        }
      }
      if (tWebIM.easemob.groups.length > 0) {
        tWebIM.dom.appendComponent(tWebIM.dom.componentAddressBookBodyList, tWebIM.easemob.groups, '#addressBook');
      }
    }
  }
};
window.onload = function() {
  $('#toregister').click(function() {
    tWebIM.encapsulation.divHide('#registerPage', '#loginPage');
  });
  $('#toLogin').click(function() {
    tWebIM.encapsulation.divHide('#loginPage', '#registerPage');
  });
  $('#login').click(function() {
    var username = $('#user').val();
    var password = $('#pwd').val();
    tWebIM.easemob.login(username, password);
  });
  $('#showChat').click(function() {
    $('#showAddressBook').css('background-position', '-220px -96px');
    $('#showChat').css('background-position', '-185px -96px');
    tWebIM.encapsulation.divHide('#chat', '#addressBook');
  });
  $('#showAddressBook').click(function() {
    $('#showAddressBook').css('background-position', '-304px -246px');
    $('#showChat').css('background-position', '-150px -96px');
    tWebIM.encapsulation.divHide('#addressBook', '#chat');
  });
  tWebIM.dom.setMainMargin();
  tWebIM.common.renderingAddressBook();
  //测试代码
};

tWebIM.easemob.conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: WebIM.config.isAutoLogin
}); //连接环信
tWebIM.easemob.conn.listen({
  onOpened: function(message) {
    //连接成功回调
    // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
    // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
    // 则无需调用conn.setPresence();
    console.log('连接成功');
    //从连接中获取到当前的登录人注册帐号名
    $(tWebIM.property.nikeName).text(tWebIM.easemob.conn.context.userId);
    //显示聊天主界面
    tWebIM.encapsulation.divHide('.main', '#loginPage');
    //显示用户列表
    tWebIM.easemob.getRoster();
  },
  onClosed: function(message) {}, //连接关闭回调
  onTextMessage: function(message) {}, //收到文本消息
  onEmojiMessage: function(message) {}, //收到表情消息
  onPictureMessage: function(message) {}, //收到图片消息
  onCmdMessage: function(message) {}, //收到命令消息
  onAudioMessage: function(message) {}, //收到音频消息
  onLocationMessage: function(message) {}, //收到位置消息
  onFileMessage: function(message) {}, //收到文件消息
  onVideoMessage: function(message) {
    var node = document.getElementById('privateVideo');
    var option = {
      url: message.url,
      headers: {
        Accept: 'audio/mp4'
      },
      onFileDownloadComplete: function(response) {
        var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
        node.src = objectURL;
      },
      onFileDownloadError: function() {
        console.log('File down load error.');
      }
    };
    WebIM.utils.download.call(conn, option);
  }, //收到视频消息
  onPresence: function(message) {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onRoster: function(message) {}, //处理好友申请
  onInviteMessage: function(message) {}, //处理群组邀请
  onOnline: function() {}, //本机网络连接成功
  onOffline: function() {}, //本机网络掉线
  onError: function(message) {}, //失败回调
  onBlacklistUpdate: function(list) {
    //黑名单变动
    // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
    console.log(list);
  },
  onReceivedMessage: function(message) {}, //收到消息送达服务器回执
  onDeliveredMessage: function(message) {}, //收到消息送达客户端回执
  onReadMessage: function(message) {}, //收到消息已读回执
  onCreateGroup: function(message) {}, //创建群组成功回执（需调用createGroupNew）
  onMutedMessage: function(message) {} //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
}); //回调函数
//模拟数据
function data1(data) {
  tWebIM.easemob.friends = data.friends;
  tWebIM.easemob.groups = data.groups;
  console.log(window);
}
