import React, { Component } from 'react';
import MyMsg from '@/component/box/MyMsg';
import OtherMsg from '@/component/box/OtherMsg';
import ToolBar from '@/component/box/ToolBar';
import styles from './index.less';

class CharBox extends Component {
  render() {
    return (
      <div>
        <div className={styles.cb_content}>
          <MyMsg />
          <OtherMsg />
          <MyMsg />
          <OtherMsg />
          <MyMsg />
          <OtherMsg />
        </div>
        <div className={styles.cb_bottom}>
          <span>
            <ToolBar name="icon_face1" />
            <ToolBar name="icon_3801wenjian" />
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
