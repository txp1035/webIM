import React, { Component } from 'react';
import MyMsg from './MyMsg.jsx';
import OtherMsg from './OtherMsg.jsx';
import ToolBar from './ToolBar.jsx';

class CharBox extends Component {
  render() {
    return (
      <div>
        <div className="cb-content">
          <MyMsg />
          <OtherMsg />
          <MyMsg />
          <OtherMsg />
          <MyMsg />
          <OtherMsg />
        </div>
        <div className="cb-bottom">
          <span>
            <ToolBar name="iconfont icon-face1" />
            <ToolBar name="iconfont icon-3801wenjian" />
          </span>
          <div className="input" contenteditable="true" />
          <div className="submit">
            <a href="javascript:;">发送</a>
            <span>按下Ctrl+Enter发送消息</span>
          </div>
        </div>
      </div>
    );
  }
}
export default CharBox;
