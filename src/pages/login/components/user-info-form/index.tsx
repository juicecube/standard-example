import * as React from 'react';

import './index.scss';

const { useState } = React;

interface UserInfoFormProps {

}

interface FormItem {
  key:string;
  name:string;
  renderComponent:() => React.ReactElement;
}

const UserInfoForm:React.FunctionComponent<UserInfoFormProps> = (props) => {

  const defaulFormData = {
    userName: '',
    age: '',
    gender: '',
    password: '',
  }

  const [formData, setFormData] = useState(() => defaulFormData);

  const onFormChange = (e:any, keyName:string) => {
    console.log('keyName', keyName);
    console.log('e.target.value', e.target.value);
    const newFormData = { ...formData, [keyName]: e.target.value }
    setFormData(newFormData);
  }

  const formItem:FormItem[] = [
    {
      key: 'userName',
      name: '用户名：',
      renderComponent: () => <input value={formData.userName} onChange={(e) => onFormChange(e, 'userName')}/>,
    },
    {
      key: 'age',
      name: '年龄：',
      renderComponent: () => <input type="number" value={formData.age} onChange={(e) => onFormChange(e, 'age')}/>,
    },
    {
      key: 'gender',
      name: '性别：',
      renderComponent: () => <input value={formData.gender} onChange={(e) => onFormChange(e, 'gender')}/>,
    },
    {
      key: 'password',
      name: '密码：',
      renderComponent: () => <input value={formData.password} onChange={(e) => onFormChange(e, 'password')}/>,
    },
  ];

  return (
    <div styleName="form_container">
      <header styleName="form_header">用户注册</header>
      <div styleName="form_content_container">
        <ul>
          {
            formItem.map((item) => {
              return(
                <li styleName="item_container">
                  <span styleName="item_name">{ item.name }</span>
                  <div styleName="item_content">
                    {
                      item.renderComponent()
                    }
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

export const UserInfoFormComp = React.memo(UserInfoForm);