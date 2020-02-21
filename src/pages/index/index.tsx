import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReduxState } from 'example/redux/root-reducer';
import {
  fetchDateListAction,
  updateSelectDate,
  fetchUserInfoAction,
  updateTodoListDataSource,
  deleteTodoListDataSource,
  addTodoListDataSource,
  updateTodoList,
  TodoDataInfo,
} from 'example/redux/index';
import { upDateObjectArrayValue } from 'example/utils/index';
import { todayDateStr } from 'example/api/fake-data';
import { withAuthenticationHoc } from 'example/components/with-authentication-hoc';
import { AvatarComp } from 'example/pages/index/components/avatar';
import { TodoListComp } from './components/todo-list';
import { DateListComp } from './components/date-list';

import './index.scss';

// 从map_state_to_props和map_dispatch_to_props返回值推断出组件的props
type IndexProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Index extends React.PureComponent<IndexProps> {

  componentDidMount() {
    this.props.fetchDateListAction();
    this.props.fetchUserInfoAction();
  }

  componentDidUpdate() {
    const { indexState } = this.props;
    if (!indexState.selectDate) {
      this.props.updateSelectDate(todayDateStr);
    }
  }

  onDateListCompSelect = (date:string) => {
    this.props.updateSelectDate(date);
  }

  onTodoListChange = (changedData:TodoDataInfo) => {
    const newData = upDateObjectArrayValue({
      sourceObjectArray: this.props.indexState.todoList,
      key: 'id',
      newItem: changedData,
    });
    this.props.updateTodoList(newData as TodoDataInfo[]);
    this.props.updateTodoListDataSource(changedData);
  }

  onTodoListRemove = (id:string) => {
    const newData = this.props.indexState.todoList.filter((item) => item.id !== id );
    this.props.updateTodoList(newData);
    this.props.deleteTodoListDataSource(id);
  }

  onTodoListAdd = (date:string) => {
    this.props.addTodoListDataSource(date);
  }

  render() {
    const { indexState } = this.props;
    const { dateList, selectDate, todoList, userInfo } = indexState;
    return(
      <div styleName="index_container">
        <header styleName="container_header">
          <div styleName="container_header_left"><p>TODO LIST</p></div>
          <div styleName="container_header_right">
            <AvatarComp userInfo={userInfo}/>
          </div>
        </header>
        <div styleName="container_content">
          <div styleName="content_left">
            <DateListComp dateList={dateList} onSelect={(date) => this.onDateListCompSelect(date)} selectedDate={selectDate}/>
          </div>
          <div styleName="content_right">
            <TodoListComp
              todoListData={todoList}
              onChange={(data) => this.onTodoListChange(data)}
              onRemove={(id) => this.onTodoListRemove(id)}
              onAdd={(date) => this.onTodoListAdd(date)}
              date={selectDate}
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
  fetchDateListAction,
  updateSelectDate,
  updateTodoListDataSource,
  deleteTodoListDataSource,
  addTodoListDataSource,
  updateTodoList,
  fetchUserInfoAction,
}, dispatch);

// eslint-disable-next-line import/no-default-export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuthenticationHoc(Index));
