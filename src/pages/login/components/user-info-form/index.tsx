import * as React from 'react';
import { AddUserInfoData } from 'example/api/fake-data';

import './index.scss';

const { useState } = React;
const MAX_LENGTH_USERNAME = 6;
const MAX_LENGTH_PASSWORD = 6;
const MAX_AGE = 100;

interface UserInfoFormProps {
  onSubmit:(submitData:AddUserInfoData) => void;
}

interface FormItem {
  key:string;
  name:string;
  renderComponent:() => React.ReactElement;
}

const UserInfoForm:React.FunctionComponent<UserInfoFormProps> = (props) => {

  const defaulFormData = {
    userName: '',
    age: undefined,
    gender: '',
    password: '',
  };

  const [formData, setFormData] = useState(() => defaulFormData as DefaultObejct);
  const [validateError, setValidateError] = useState({} as DefaultObejct);

  const formItem:FormItem[] = [
    {
      key: 'userName',
      name: '用户名：',
      renderComponent: () => <input id="userNameInput" value={formData.userName} onChange={(e) => onFormChange(e, 'userName', (value:any) => {
        if (!value || !value.trim()) { return '用户名不能为空'; }
        if (value.length > MAX_LENGTH_USERNAME) { return '用户名不超过6位'; }
        return '';
      })}/>,
    },
    {
      key: 'age',
      name: '年龄：',
      renderComponent: () => <input id="ageInput" value={formData.age} onChange={(e) => onFormChange(e, 'age', (value:any) => {
        if (!value || !value.trim()) { return '年龄不能为空'; }
        if (isNaN(Number(value))) { return '必须为数字'; }
        if (value <= 0 || value > MAX_AGE) { return `必须为1~${MAX_AGE}之间`; }
        return '';
      })}/>,
    },
    {
      key: 'gender',
      name: '性别：',
      renderComponent: () => <input id="genderInput" value={formData.gender} onChange={(e) => onFormChange(e, 'gender', (value:any) => {
        if (!value || !value.trim()) { return '性别不能为空'; }
        if (value !== '男' && value !== '女'  ) { return '性别只能为男或女'; }
        return '';
      })}/>,
    },
    {
      key: 'password',
      name: '密码：',
      renderComponent: () => <input id="passwordInput" value={formData.password} onChange={(e) => onFormChange(e, 'password', (value:any) => {
        if (!value || !value.trim()) { return '密码不能为空'; }
        if (value.length > MAX_LENGTH_PASSWORD) { return '密码在6位以下'; }
        return '';
      })}/>,
    },
  ];

  const onFormChange = (e:any, keyName:string, validate?:(value:any) => string) => {
    const newFormData = { ...formData, [keyName]: e.target.value };
    setFormData(newFormData);
    if (validate) {
      const newValidateError = validate(e.target.value);
      if (!newValidateError) {
        validateError[keyName] && delete validateError[keyName] && setValidateError(validateError);
        return;
      }
      setValidateError({ ...validateError, [keyName]: newValidateError });
    }
  };

  const onSubmit = () => {
    if (Object.keys(validateError).length > 0) {
      window.alert('格式不正确，请修改！');
      return;
    }
    try {
      Object.keys(formData).forEach((item) => {
        if (!formData[item]) {
          throw new Error('数据不能为空！');
        }
      });
    } catch (e) {
      window.alert(e.message);
    }
    props.onSubmit && props.onSubmit(formData as AddUserInfoData);
  };

  return (
    <div styleName="form_container">
      <header styleName="form_header">用户注册</header>
      <div styleName="form_content_container">
        <ul>
          {
            formItem.map((item) => {
              return(
                <li styleName="item_container" key={item.key}>
                  <span styleName="item_name">{ item.name }</span>
                  <div styleName="item_content">
                    {
                      item.renderComponent()
                    }
                    {
                      validateError[item.key]
                        ? <span styleName="validateError">{validateError[item.key]}</span>
                        : null
                    }
                  </div>
                </li>
              );
            })
          }
        </ul>
        <div styleName="option_container">
          <button styleName="submit_button" onClick={onSubmit}>提交</button>
        </div>
      </div>
    </div>
  );
};

export const UserInfoFormComp = React.memo(UserInfoForm);