import React, { Component } from 'react';
import userImg from '../img/bg.jpg'
import NavButton from './NavButton.jsx'
import ListPro from './ListPro.jsx'
import CharBox from './CharBox.jsx'


class Main extends Component {
    render() {
        return (
            <div className="main-page">
                <div className="user-info-box">
                    <div className="uib-top">
                        <img src={userImg} alt="用户头像" />
                        <span>111123</span>
                        <i className="iconfont icon-nav">
                            <ul>
                                <li>添加好友</li>
                                <li>添加群组</li>
                                <li>创建群组</li>
                                <li><a href="#/Login">退出登录</a></li>
                            </ul>
                        </i>
                    </div>
                    <div className="uib-search">
                        <i className="iconfont icon-search"></i>
                        <input type="text" name="" id="" placeholder="搜索" />
                    </div>
                    <div className="uib-bottom">
                        <div className="nav">
                            <NavButton name="iconfont icon-chat" />
                            <NavButton name="iconfont icon-user" />
                        </div>
                        <div className="list">
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                            <ListPro />
                        </div>
                    </div>
                </div>
                <CharBox />
            </div>
        )
    }
}

export default Main;