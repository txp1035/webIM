import React, { Component } from 'react';
// import userImg from '../../img/faces/ee_1.png'


class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ul: "none",
        };
        this.iClick = this.iClick.bind(this);
        this.bodyClick = this.bodyClick.bind(this);
        this.liClick = this.liClick.bind(this);
    }
    iClick() {
        
        this.setState({ ul: "" });
        e.nativeEvent.stopImmediatePropagation();
    }
    liClick(){
        console.log("123")
        this.setState({ ul: "none" });
    }
    bodyClick() {
        this.setState({ ul: "none" });
    }//冒泡影藏菜单事件
    componentDidMount() {
        document.body.addEventListener('click', this.bodyClick, false);
    }//生命周期开始
    componentWillUnmount() {
        document.body.removeEventListener('click', this.bodyClick, false);
    }//生命周期结束
    render() {
        const requireContext = require.context("../../img/faces", true, /^\.\/.*\.png$/);
        const faces = requireContext.keys().map(requireContext);
        const numbers = [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2];
        const list = numbers.map((number, index) => {
            let url = 'url(' + faces[index] + ')';
            return <li key={index} style={{ background: url }} onClick={this.liClick}></li>;
        }
        );
        return (
            <div className="tool-bar">
                <i className={this.props.name} onClick={this.iClick}>
                    <ul style={{ display: this.state.ul }}>
                        {list}
                    </ul>
                </i>
            </div>
        )
    }
}
export default ToolBar;