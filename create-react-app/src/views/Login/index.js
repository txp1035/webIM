import React, { Component } from 'react';
import styles from './index.less';

class Login extends Component {
  login = () => {
    window.location.href = '#/Main';
  };
  render() {
    return (
      <div className={styles.login}>
        <form>
          <h2>登录</h2>
          <input type="text" placeholder="用户名" />
          <input type="password" placeholder="密码" />
          <button onClick={this.login}>登录</button>
          <p>
            <span>没有账号，</span>
            <a href="#/Register">现在注册</a>
          </p>
        </form>
      </div>
    );
  }
}
export default Login;
