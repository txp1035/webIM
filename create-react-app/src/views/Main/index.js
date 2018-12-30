import React, { Component } from 'react';
import userImg from '@/assets/img/bg.jpg';
import NavBtn from '@/component/list/NavBtn';
import ChatListPro from '@/component/list/ChatListPro';
import UserListProH from '@/component/list/UserListProH';
import UserListProC from '@/component/list/UserListProC';
import MainRight from '@/component/box/MainRight';
import styles from './index.less';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: 'hide',
      mainRight: 'cover',
      list: 'chat'
    };
    this.menuClick = this.menuClick.bind(this);
    this.bodyClick = this.bodyClick.bind(this);
    this.chatListProClick = this.chatListProClick.bind(this);
    this.chatNavBtnClick = this.chatNavBtnClick.bind(this);
    this.userNavBtnClick = this.userNavBtnClick.bind(this);
    this.userListProCClick = this.userListProCClick.bind(this);
  }
  logoutClick() {
    window.location.href = '#/';
  } //登录点击事件
  menuClick() {
    this.setState({ menuList: '' });
    return false;
  } //菜单点击事件
  bodyClick() {
    this.setState({ menuList: 'hide' });
  } //冒泡影藏菜单事件
  chatListProClick() {
    this.setState({ mainRight: 'chat' });
  } //聊天列表项目点击事件
  chatNavBtnClick() {
    this.setState({ list: 'chat' });
  } //聊天导航按钮点击事件
  userNavBtnClick() {
    this.setState({ list: 'user' });
  } //用户导航按钮点击事件
  userListProCClick() {
    this.setState({ mainRight: 'userinfo' });
  } //聊天导航按钮点击事件

  componentDidMount() {
    document.body.addEventListener('click', this.bodyClick, false);
  } //生命周期开始
  componentWillUnmount() {
    document.body.removeEventListener('click', this.bodyClick, false);
  } //生命周期结束

  render() {
    const numbers = [1, 2, 2, 2, 1, 2, 2];
    var listItems;
    if (this.state.list === 'chat') {
      listItems = numbers.map((number, index) => <ChatListPro onClick={this.chatListProClick} key={index} />);
    } else if (this.state.list === 'user') {
      listItems = numbers.map((number, index) => {
        if (number === '1') {
          return <UserListProH key={index} />;
        }
        if (number === '2') {
          return <UserListProC onClick={this.userListProCClick} key={index} />;
        }
      });
    }
    return (
      <div className={styles.main}>
        <div className={styles.user_list}>
          <div className={styles.ui_top}>
            <img src={userImg} alt="用户头像" />
            <span>111123</span>
            {/* styles.iconfont */}
            <i className={styles.icon_nav} onClick={this.menuClick}>
              <ul className={this.state.menuList}>
                <li>添加好友</li>
                <li>添加群组</li>
                <li>创建群组</li>
                <li onClick={this.logoutClick}>退出登录</li>
              </ul>
            </i>
          </div>
          <div className={styles.ui_search}>
            <i className={styles.icon_search} />
            <input type="text" name="" id="" placeholder="搜索" />
          </div>
          <div className={styles.ui_bottom}>
            <div className={styles.nav}>
              <NavBtn name={styles.icon_chat} onClick={this.chatNavBtnClick} />
              <NavBtn name={styles.icon_user} onClick={this.userNavBtnClick} />
            </div>
            <div className={styles.list} id="list">
              {listItems}
            </div>
          </div>
        </div>
        <MainRight type={this.state.mainRight} />
      </div>
    );
  }
}

export default Main;
