import React, { Component } from 'react';

class NavBtn extends Component {
    render() {
        return (
            <div className="nav-btn">
                <i className={this.props.name}></i>
            </div>
        )
    }
}
export default NavBtn;