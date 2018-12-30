import React, { Component } from 'react';
import userImg from '@/assets/img/bg.jpg';
import styles from './index.less';

class ListPro extends Component {
  render() {
    return (
      <div className={styles.chat_list_pro} onClick={this.props.onClick}>
        <i className={this.props.name} />
        <img src={userImg} alt="用户头像" />
        <span>456</span>
      </div>
    );
  }
}
export default ListPro;
