import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as cn from 'classnames';
import { fetchLogin, fetchRegister } from 'example/redux/login/index';
import { storeManage, USER_TOKEN, USER_ID, SESSION } from 'example/utils/storage-manage';
import { UserInfoFormComp } from 'example/pages/login/components/user-info-form';
import { AddUserInfoData } from 'example/api/fake-data';
import './index.scss';
const { useState } = React;

const LOGIN = 'login';
const REGISTER = 'register';

const Login:React.FunctionComponent = (props) => {

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
    console.log('click login');
    dispatch(fetchLogin({
      userName,
      password,
      cb: (res:any) => {
        const { authentication, userId } = res;
        window.alert('登陆成功！！');
        storeManage.set(USER_TOKEN, authentication, SESSION);
        storeManage.set(USER_ID, userId, SESSION);
        window.browserHistory.push('/');
      },
    }));
  };

  const onTabClick = (selected:string) => {
    setSelectedTab(selected);
  };

  const onRegisterSubmit = (submitData:AddUserInfoData) => {
    dispatch(fetchRegister({
      userName: submitData.userName,
      age: submitData.age,
      gender: submitData.gender,
      password: submitData.password,
      cb: (res:any) => {
        window.alert('注册成功！！');
        setSelectedTab(LOGIN);
        setUserName('');
        setPassWord('');
      },
    }));
  };

  return (
    <div styleName="login_wrap">
      <div styleName="content_container">
        <div styleName="content_header">
          <i styleName="icon_logo"></i>
          <div>
            <h1>Welcome to TodoList example project!</h1>
            <p>这里将以简单的TodoList为示例，演示react全家桶和最佳实践。</p>
          </div>
          {/* <div styleName="content_header_right">
            <ul styleName="header_option_container">
              <li styleName={cn({ 'selected': selectedTab === REGISTER })} onClick={() => onTabClick(REGISTER)}><span styleName="register_icon"></span>注册</li>
              <li styleName={cn({ 'selected': selectedTab === LOGIN })} onClick={() => onTabClick(LOGIN)}><span styleName="login_icon"></span>登陆</li>
            </ul>
          </div> */}
        </div>
        {
          selectedTab === LOGIN
            ? <div styleName="login_box">
              <div styleName="option_container">
                <div styleName="btn_box">
                  <input type="text" id="username" value={userName} onChange={(e) => onUsernameChange(e)} placeholder="用户名" />
                  <i styleName="login_user" aria-hidden="true"></i>
                </div>
                <div styleName="btn_box_radius">
                  <input type="password" id="password" value={password} onChange={(e) => onPassWordChange(e)} placeholder="密码" maxLength={12}/>
                  <i styleName="login_lock" aria-hidden="true"></i>
                </div>
                <button styleName="login_button" onClick={onLoginClick}>登录</button>
              </div>
            </div>
            : <div styleName="register_container">
              <UserInfoFormComp onSubmit={(submitData:AddUserInfoData) => onRegisterSubmit(submitData)} />
            </div>
        }
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default React.memo(Login);
