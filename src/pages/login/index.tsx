import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { fetchLogin } from 'example/redux/login/index';
import { selectUserInfo } from 'example/redux/index';
import './index.scss';
const { useState, useEffect } = React;

const Login:React.FunctionComponent = (props) => {

  const userInfo = useSelector(selectUserInfo);
  const history = useHistory();

  useEffect(() => {
    console.log('use Effect');
    if (userInfo.id && userInfo.id !== 'fetching') {
      history.push('/');
    }
  }, [userInfo]);

  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState('');

  const dispatch = useDispatch();

  const onUsernameChange = (e:any) => {
    setUserName(e.target.value);
  };

  const onPassWordChange = (e:any) => {
    setPassWord(e.target.value);
  };

  const onLoginClick = () => {
    if (!userName || !password) {
      window.alert('请填写用户名/密码！');
      return;
    }
    console.log('click login');
    dispatch(fetchLogin({
      userName,
      password,
    }));
  };

  return (
    <div styleName="login_wrap">
      <div styleName="content_container">
        <div styleName="content_header">
          <i styleName="icon_logo"></i>
          <div>
            <h1>Welcome to TodoList example project!</h1>
            <p>这里将以简单的TodoList为示例，演示react全家桶和最佳实践（若没有账号则会自动生成一个新账号）。</p>
          </div>
        </div>
        <div styleName="login_box">
          <p>Username</p>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => onUsernameChange(e)}
            placeholder="用户名"
          />
          <p>Password</p>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => onPassWordChange(e)}
            placeholder="密码"
            maxLength={12}
          />
          <button styleName="login_button" onClick={onLoginClick}>Login with Username</button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
