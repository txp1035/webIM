import React, { Component } from 'react';

class NavButton extends Component {
    render() {
        return (
            <div className="nav-button">
                <i className={this.props.name}></i>
            </div>
        )
    }
}
export default NavButton;