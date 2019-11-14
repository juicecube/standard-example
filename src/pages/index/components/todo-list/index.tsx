import * as React from 'react';
import { TodoDataInfo } from 'example/redux/index/index';
import { TodoListItemComp } from '../todo-list-item';
import './index.scss';

interface TodoListProps {
  date:string;
  todoListData:TodoDataInfo[];
  onChange:(data:TodoDataInfo) => void;
  onRemove:(id:string) => void;
  onAdd:(date:string) => void;
}

const TodoList:React.FunctionComponent<TodoListProps> = (props) => {

  const { todoListData, onChange, onRemove, onAdd, date } = props;

  return(
    <div styleName="container">
      {
        todoListData.map((item, indx) => {
          return (
            <TodoListItemComp
              key={item.id}
              itemData={item}
              onChange={(data) => onChange(data)}
              onRemove={(id) => onRemove(id)}
            />
          );
        })
      }
      <div styleName="add_new_item" onClick={() => onAdd(date)}>添加</div>
    </div>
  );
};

export const TodoListComp = React.memo(TodoList);