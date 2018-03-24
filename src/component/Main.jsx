import React, { Component } from 'react';
import userImg from '../img/bg.jpg'
import NavBtn from './list/NavBtn.jsx'
import ChatListPro from './list/ChatListPro.jsx'
import MainRight from './box/MainRight.jsx'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { a: "hide" };
        this.menuClick = this.menuClick.bind(this);
        this.bodyClick = this.bodyClick.bind(this);
    }
    logoutClick() {
        window.location.href = "#/";
    }
    menuClick() {
        this.setState({ a: "" });
    }
    bodyClick() {
        this.setState({ a: "hide" });
    }
    componentDidMount() {
        document.body.addEventListener('click', this.bodyClick, false);

    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.bodyClick, false);
    }

    render() {
        return (
            <div className="main">
                <div className="user-list">
                    <div className="ui-top">
                        <img src={userImg} alt="用户头像" />
                        <span>111123</span>
                        <i className="iconfont icon-nav" onClick={this.menuClick}>
                            <ul className={this.state.a}>
                                <li>添加好友</li>
                                <li>添加群组</li>
                                <li>创建群组</li>
                                <li onClick={this.logoutClick}>退出登录</li>
                            </ul>
                        </i>
                    </div>
                    <div className="ui-search">
                        <i className="iconfont icon-search"></i>
                        <input type="text" name="" id="" placeholder="搜索" />
                    </div>
                    <div className="ui-bottom">
                        <div className="nav">
                            <NavBtn name="iconfont icon-chat" />
                            <NavBtn name="iconfont icon-user" />
                        </div>
                        <div className="list">
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                            <ChatListPro />
                        </div>
                    </div>
                </div>
                <MainRight type="cover"/>
            </div>
        )
    }
}

export default Main;