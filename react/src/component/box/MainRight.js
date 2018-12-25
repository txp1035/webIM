import React, { Component } from 'react';
import CharBox from './CharBox.js';
import UserInfoBox from './UserInfoBox.js';
import CopyRight from './CopyRight.js';

class MainRight extends Component {
  render() {
    let title = null;
    let titleIcon = null;
    let content = null;
    if (this.props.type == 'chat') {
      title = '用户名'; //需要修改
      titleIcon = <i className="iconfont icon-nav-more" />;
      content = <CharBox />;
    } else if (this.props.type == 'userinfo') {
      title = '详细信息';
      content = <UserInfoBox />;
    } else if (this.props.type == 'cover') {
      content = <CopyRight />;
    }
    return (
      <div className="main-right">
        <div className="mr-top">
          <span>{title}</span>
          {titleIcon}
        </div>
        {content}
      </div>
    );
  }
}
export default MainRight;
