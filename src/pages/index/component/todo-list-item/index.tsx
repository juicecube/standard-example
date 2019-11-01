import * as React from 'react';
import * as cn from 'classnames';
import { MyRadioComp } from 'src/component/my-radio';
import { TodoDataInfo } from 'src/redux/index/index';

import './index.scss';

const { useState } = React;

interface TodoListItemProps {
  itemData:TodoDataInfo;
  onChange:(data:TodoDataInfo) => void;
  onRemove:(id:string) => void;
}

const TodoListItem:React.FunctionComponent<TodoListItemProps> = (props) => {
  
  const { itemData, onChange, onRemove } = props;
  const { id, date, isFinished, overview , details } = itemData;

  const [showDetails, setShowDetails] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [mark, setMark] = useState(details);

  const onContentClick = () => {
    setShowDetails(!showDetails);
  }

  const onTextAreaChange = (e:any) => {
    setMark(e.target.value);
  }

  const onEditButtonClick = () => {
    setIsEdit(true);
  }

  const onSaveButtonClick = () => {
    setIsEdit(false);
    onChange({
      ...props.itemData,
      'details': mark,
    });
  }

  const onClickRadio = (selected:boolean) => {
    onChange({
      ...props.itemData,
      'isFinished': selected,
    });
  }

  const onDeleteIconClick = () => {
    onRemove(id);
  }

  return(
    <div styleName={cn('container', { 'show_details_container': showDetails })}>
      <div styleName="content" onClick={onContentClick}>
        <div styleName="radio middle">
          <MyRadioComp selected={isFinished} onChange={(selected) => onClickRadio(selected)}/>
        </div>
        <div styleName="overview middle">{ overview }</div>
        <div styleName="delete middle"><span styleName="delete_icon" onClick={onDeleteIconClick}></span></div>
      </div>
      <div styleName="details">
        <span styleName="mark">备注：</span>
        {
          isEdit
            ? <textarea styleName="mark_details" defaultValue={mark || '无'} onChange={(e) => onTextAreaChange(e)}></textarea>
            : <span styleName="mark_details">{mark || '无'}</span>
        }
        <span styleName="operation">
          {
            isEdit
              ? <button styleName="save_button" onClick={onSaveButtonClick}>保存</button>
              : <button styleName="edit_button" onClick={onEditButtonClick}>编辑</button>
          }
        </span>
      </div>
    </div>
  );
}

export const TodoListItemComp = React.memo(TodoListItem);