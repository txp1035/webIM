import React, { Component } from 'react';
import userImg from '../../img/bg.jpg'

class ListPro extends Component {
    render() {
        return (
            <div className="chat-list-pro" onClick={this.props.onClick}>
                <i className={this.props.name}></i>
                <img src={userImg} alt="用户头像"/>
                <span>456</span>
            </div>
        )
    }
}
export default ListPro;