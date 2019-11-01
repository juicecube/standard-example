import * as React from 'react';
import { MyRadioComp } from 'src/component/my-radio';

interface TodoItemProps {

}

const TodoItem:React.FunctionComponent<TodoItemProps> = (props) => {

  return(
    <div>
      <p>这是一个demo</p>
      <MyRadioComp selected={true}/>

    </div>
  );
}

export const TodoItemComp = React.memo(TodoItem);