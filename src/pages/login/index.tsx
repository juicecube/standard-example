import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as cn from 'classnames';
import { fetch_login } from 'example/redux/login/index';
import { storeManage, USER_TOKEN, USER_ID } from 'example/utils/storage-manage';
import { UserInfoFormComp } from 'example/pages/login/components/user-info-form';
import './index.scss';
const { useState } = React;

const LOGIN = 'login';
const REGISTER = 'register';

type LoginProps = {};

const Login:React.FunctionComponent<LoginProps> = (props) => {

  const [userName, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [selectedTab, setSelectedTab] = useState(LOGIN);

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
    dispatch(fetch_login({
      userName,
      password,
      cb: (res:any) => {
        const { authentication, userId } = res;
        console.log('rescallback');
        window.alert('登陆成功！！');
        storeManage.set(USER_TOKEN, authentication);
        storeManage.set(USER_ID, userId);
        window.browserHistory.push('/');
      },
    }));
  };

  const onTabClick = (selected:string) => {
    setSelectedTab(selected);
  };

  return (
    <div styleName="login_wrap">
        <div styleName="content_container">
          <div styleName="content_header">
            <div styleName="content_header_left">
              <span>TODO LIST</span>
            </div>
            <div styleName="content_header_right">
              <ul styleName="header_option_container">
                <li styleName={cn({ 'selected': selectedTab === REGISTER })} onClick={() => onTabClick(REGISTER)}><span styleName="register_icon"></span>注册</li>
                <li styleName={cn({ 'selected': selectedTab === LOGIN })} onClick={() => onTabClick(LOGIN)}><span styleName="login_icon"></span>登陆</li>
              </ul>
            </div>
          </div>
          {
            selectedTab === LOGIN
              ? <div styleName="login_box">
                  <header styleName="login_header">
                    <p>LOGIN</p>
                  </header>
                  <div styleName="option_container">
                    <div styleName="btn_box">
                      <input type="text" name="username" value={userName} onChange={(e) => onUsernameChange(e)} placeholder="用户名" />
                      <i styleName="login_user" aria-hidden="true"></i>
                    </div>
                    <div styleName="btn_box_radius">
                      <input type="password" name="password" value={password} onChange={(e) => onPassWordChange(e)} placeholder="密码" maxLength={12}/>
                      <i styleName="login_lock" aria-hidden="true"></i>
                    </div>
                    <button styleName="login" onClick={onLoginClick}>登录</button>
                  </div>
                </div>
              : <div styleName="register_container">
                  <UserInfoFormComp />
                </div>
          }
        </div>
      </div>
  );
};

export default React.memo(Login);