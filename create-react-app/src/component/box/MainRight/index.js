import React, { Component } from 'react';
import CharBox from '@/component/box/CharBox';
import UserInfoBox from '@/component/box/UserInfoBox';
import CopyRight from '@/component/box/CopyRight';
import styles from './index.less';

class MainRight extends Component {
  render() {
    let title = null;
    let titleIcon = null;
    let content = null;
    if (this.props.type === 'chat') {
      title = '用户名'; //需要修改
      titleIcon = <i className=" icon-nav-more" />;
      content = <CharBox />;
    } else if (this.props.type === 'userinfo') {
      title = '详细信息';
      content = <UserInfoBox />;
    } else if (this.props.type === 'cover') {
      content = <CopyRight />;
    }
    return (
      <div className={styles.main_right}>
        <div className={styles.mr_top}>
          <span>{title}</span>
          {titleIcon}
        </div>
        {content}
      </div>
    );
  }
}
export default MainRight;
