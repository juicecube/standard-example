import * as React from 'react';
import * as cn from 'classnames';
import { MyRadioComp } from 'example/component/my-radio';
import { TodoDataInfo } from 'example/redux/index/index';

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
  const [overviewInputing, setOverviewInputing] = useState(false);
  const [displayOverview, setDisplayOverview] = useState(overview);

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

  const onRadioClick = (selected:boolean) => {
    onChange({
      ...props.itemData,
      'isFinished': selected,
    });
  }

  const onDeleteIconClick = () => {
    onRemove(id);
  }

  const onOverviewClick = (e:any) => {
    e.stopPropagation();
    setOverviewInputing(true);
  }

  const onOverviewChange = (e:any) => {
    setDisplayOverview(e.target.value);
  }

  const onOverviewSave = (e:any) => {
    e.stopPropagation();
    setOverviewInputing(false);
    onChange({
      ...props.itemData,
      'overview': displayOverview,
    });
  }

  return(
    <div styleName={cn('container', { 'show_details_container': showDetails })}>
      <div styleName="content" onClick={onContentClick}>
        <div styleName="radio middle">
          <MyRadioComp selected={isFinished} onChange={(selected) => onRadioClick(selected)}/>
        </div>
        <div styleName="overview middle">
          {
            overviewInputing
              ? <div>
                  <input type="text" styleName="overview_input" defaultValue={displayOverview} onChange={(e) => onOverviewChange(e)} onClick={(e) => e.stopPropagation()}/>
                  <button onClick={(e) => onOverviewSave(e)}>保存</button>
                </div>
              : <div styleName="overview_div middle">
                  <span styleName="overview_editable_area" onClick={(e) => onOverviewClick(e)}>{ displayOverview }</span>
                </div>
          }
        </div>
        <div styleName="delete middle"><span styleName="delete_icon" onClick={onDeleteIconClick}></span></div>
      </div>
      <div styleName="details">
        <span styleName="mark middle">备注：</span>
        <div styleName="mark_content">
          {
            isEdit
              ? <textarea styleName="mark_details_textarea" defaultValue={mark || '无'} onChange={(e) => onTextAreaChange(e)}></textarea>
              : <span styleName="mark_details_span">{mark || '无'}</span>
          }
        </div>
        <span styleName="operation middle">
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