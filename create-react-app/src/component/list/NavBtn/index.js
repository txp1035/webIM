import React, { Component } from 'react';
import styles from './index.less';

class NavBtn extends Component {
  render() {
    return (
      <div className={styles.nav_btn} onClick={this.props.onClick}>
        <i className={this.props.name} />
      </div>
    );
  }
}
export default NavBtn;
