import React, { Component } from 'react';
import userImg from '../../img/bg.jpg';

class UserListProC extends Component {
  render() {
    return (
      <div className="user-list-pro-c" onClick={this.props.onClick}>
        <img src={userImg} alt="用户头像" />
        <span>1231111111111111111111111111111111111111111</span>
      </div>
    );
  }
}
export default UserListProC;
