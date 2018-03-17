import React, { Component } from 'react';
import userImg from '../img/bg.jpg'
import NavButton from './NavButton.jsx'
import ListPro from './ListPro.jsx'

class Main extends Component {
    render() {
        return (
            <div className="main-page">
                <div className="user-info-box">
                    <div className="uib-top">
                        <img src={userImg} alt="用户头像" />
                        <span>111123</span>
                        <i className="iconfont icon-leibie_s"></i>
                    </div>
                    <div className="uib-search">
                        <i className="iconfont icon-sousuo5"></i>
                        <input type="text" name="" id="" placeholder="搜索" />
                    </div>
                    <div className="uib-bottom">
                        <div className="nav">
                            <NavButton name="iconfont icon-xiaoxi-copy" />
                            <NavButton name="iconfont icon-qiehuanzhanghao" />
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
                <div className="chat-box"></div>
            </div>
        )
    }
}

export default Main;