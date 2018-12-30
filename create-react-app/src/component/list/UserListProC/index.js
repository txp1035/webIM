import React, { Component } from 'react';
import userImg from '@/assets/img/bg.jpg';
import styles from './index.less';

class UserListProC extends Component {
  render() {
    return (
      <div className={styles.user_list_pro_c} onClick={this.props.onClick}>
        <img src={userImg} alt="用户头像" />
        <span>1231111111111111111111111111111111111111111</span>
      </div>
    );
  }
}
export default UserListProC;
