import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="login-page">
                <form>
                    <h2>登录</h2>
                    <input type="text" placeholder="用户名" />
                    <input type="password" placeholder="密码" />
                    <button>登录</button>
                    <p><span>没有账号，</span><a>现在注册</a></p>
                </form>
            </div>
        )
    }
}
export default Login;