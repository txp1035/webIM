import React, { Component } from 'react';

export default class Register extends Component {
    render() {
        return (
            <div className="register-page">
                <form>
                    <h2>注册</h2>
                    <input type="text" placeholder="用户名"/>
                    <input type="password" placeholder="密码"/>
                    <input type="text" placeholder="昵称"/>
                    <button>登录</button>
                    <p><span>已有账号，</span><a>登录</a></p>
                </form>
            </div>
        )
    }
}