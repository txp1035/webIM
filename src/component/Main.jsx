import React, { Component } from 'react';
import userImg from '../img/bg.jpg'

class Main extends Component {
    render() {
        return (
            <div className="main-page">
                <div className="user-info-box">
                    <div className="uib-top">
                        <img src={userImg} alt="用户头像" />
                        <span>111123</span>
                        <button></button>
                    </div>
                    <input type="text" name="" id="" placeholder="搜索" />
                </div>
                <div className="chat-box"></div>
            </div>
        )
    }
}

export default Main;