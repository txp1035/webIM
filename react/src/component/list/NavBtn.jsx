import React, { Component } from 'react';

class NavBtn extends Component {
    render() {
        return (
            <div className="nav-btn" onClick={this.props.onClick}>
                <i className={this.props.name}></i>
            </div>
        )
    }
}
export default NavBtn;