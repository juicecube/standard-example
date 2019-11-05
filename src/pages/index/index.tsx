import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReduxState } from 'example/redux/root-reducer';
import {
  fetch_date_list,
  update_select_date,
  update_todo_list_data_source,
  delete_todo_list_data_source,
  add_todo_list_data_source,
  update_todo_list,
  TodoDataInfo
} from 'example/redux/index';
import { DateListComp } from './component/date-list';
import { TodoListComp } from './component/todo-list';
import { upDateObjectValue } from 'example/utils/index';
import { todayDateStr } from 'example/api/fake-data';

import './index.scss';


// 从map_state_to_props和map_dispatch_to_props返回值推断出组件的props
type IndexProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Index extends React.PureComponent<IndexProps> {

  componentDidMount() {
   this.props.fetch_date_list();
  }

  componentDidUpdate() {
    const { indexState } = this.props;
    if (!indexState.select_date){
      this.props.update_select_date(todayDateStr);
    }
  }

  onDateListCompSelect = (date:string) => {
    this.props.update_select_date(date);
  }

  onTodoListChange = (changedData:TodoDataInfo) => {
    const newData = upDateObjectValue({
      sourceObjectArray: this.props.indexState.todoList,
      key: 'id',
      newItem: changedData,
    });
    this.props.update_todo_list(newData as TodoDataInfo[]);
    this.props.update_todo_list_data_source(changedData);
  }

  onTodoListRemove = (id:string) => {
    const newData = this.props.indexState.todoList.filter((item) => item.id !== id );
    this.props.update_todo_list(newData);
    this.props.delete_todo_list_data_source(id);
  }

  onTodoListAdd = (date:string) => {
    this.props.add_todo_list_data_source(date);
  }

  render() {
    const { indexState } = this.props
    const { dateList, select_date, todoList } = indexState;
    return(
      <div styleName="index_container">
        <header styleName="container_header">
          <p>TODO LIST</p>
        </header>
        <div styleName="container_content">
          <div styleName="content_left">
            <DateListComp dateList={dateList} onSelect={(date) => this.onDateListCompSelect(date)} selectedDate={select_date}/>
          </div>
          <div styleName="content_right">
            <TodoListComp
              todoListData={todoList}
              onChange={(data) => this.onTodoListChange(data)}
              onRemove={(id) => this.onTodoListRemove(id)}
              onAdd={(date) => this.onTodoListAdd(date)}
              date={select_date}
            />
          </div>
        </div>
      </div>
    );
  }
} 

const mapStateToProps = (state:ReduxState) => ({
  indexState: state.indexState,
});

const mapDispatchToProps = (dispatch:any) => bindActionCreators({
  fetch_date_list,
  update_select_date,
  update_todo_list_data_source,
  delete_todo_list_data_source,
  add_todo_list_data_source,
  update_todo_list,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
