import React, { Component } from 'react';
import CharBox from './CharBox.jsx'
import UserInfoBox from './UserInfoBox.jsx'

class MainRight extends Component {
    render() {
        let title = null;
        let titleIcon = null;
        let content = null;
        if (this.props.type == "chat") {
            title = "用户名";//需要修改
            titleIcon = <i className="iconfont icon-nav-more"></i>
            content = <CharBox />;
        } else if (this.props.type == "userinfo"){
            title = "详细信息"
            content = <UserInfoBox />;
        }
        return (
            <div className="main-right">
                <div className="mr-top">
                    <span>{title}</span>
                    {titleIcon}
                </div>
                {content}
            </div>
        )
    }
}
export default MainRight;