import React, { Component } from 'react';
import userImg from '../img/bg.jpg'
import NavButton from './NavButton.jsx'
import ListPro from './ListPro.jsx'
import MyMsg from './MyMsg.jsx'
import OtherMsg from './OtherMsg.jsx'

class Main extends Component {
    render() {
        return (
            <div className="main-page">
                <div className="user-info-box">
                    <div className="uib-top">
                        <img src={userImg} alt="用户头像" />
                        <span>111123</span>
                        <i className="iconfont icon-nav"></i>
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
                <div className="chat-box">
                    <div className="cb-top">
                        <span>123</span>
                        <i className="iconfont icon-nav-more"></i>
                    </div>
                    <div className="cb-content">
                        <MyMsg />
                        <OtherMsg />
                        <MyMsg />
                        <OtherMsg />
                        <MyMsg />
                        <OtherMsg />
                    </div>
                    <div className="cb-bottom"></div>
                </div>
            </div>
        )
    }
}

export default Main;