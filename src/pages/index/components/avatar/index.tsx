import * as React from 'react';
import { UserInfo } from 'example/redux/index';
import './index.scss';

const defaultBackground = '~example/pages/index/assets/male-user.png'

const { useState } = React;

interface AvatarProps {
  userInfo:UserInfo;
}

const Avatar:React.FunctionComponent<AvatarProps> = (props) => {

  const { userInfo } = props;

  const [showInfo, setShowInfo] = useState(false);
  const displayKeys = Object.keys(userInfo);

  return (
    <div styleName="avatar_container" style={{ backgroundImage: userInfo.avatar || defaultBackground }} onClick={() => setShowInfo(!showInfo)}>
      {
        showInfo
          && <div styleName="avatar_info_container">
              <ul>
                {
                  displayKeys.filter((obkey) => obkey !== 'avatar').map((item:string) => {
                    return (
                      <li key={item} styleName="info_item">
                        <span styleName="item_key">{item}：</span>
                        <span styleName="item_content">{userInfo[item]}</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
      }
    </div>
  );
}

export const AvatarComp = React.memo(Avatar);
