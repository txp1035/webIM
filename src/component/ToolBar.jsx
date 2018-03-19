import React, { Component } from 'react';

class ToolBar extends Component {
    render() {
        return (
            <div className="tool-bar">
                <i className={this.props.name}></i>
            </div>
        )
    }
}
export default ToolBar;