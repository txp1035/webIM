import React, { Component } from 'react';
import userImg from '../../img/bg.jpg'

class CharBox extends Component {
    render() {
        return (
            <div className="user-info-box">
                <img src={userImg} alt="人物头像"/>
                <h4>宝宝</h4>
                <p>签名</p>
                <div>
                    <span>备注：备注</span>
                    <span>群名：我是一个群</span>
                    <span>地址：成都市锦江区春熙路</span>
                </div>
                <button>发消息</button>
            </div>
        )
    }
}
export default CharBox;