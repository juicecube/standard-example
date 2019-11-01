import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReduxState } from 'src/redux/root-reducer';
import { fetch_date_list } from 'src/redux/index';
import { DateListComp } from './component/date-list';
import './index.scss';

// 从map_state_to_props和map_dispatch_to_props返回值推断出组件的props
type IndexProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export class Index extends React.PureComponent<IndexProps> {

  componentDidMount() {
    this.props.fetch_date_list();
  }

  onDateListCompSelect = (id:string) => {

  }

  render() {
    const { indexState } = this.props
    const { dateList, select_date, todoList } = indexState;
    console.log('list', indexState);
    return(
      <div styleName="index_container">
        <header styleName="container_header">
          <p>TODO LIST</p>
        </header>
        <div styleName="container_content">
          <div styleName="content_left">
            <DateListComp dateList={dateList} onSelect={(id) => this.onDateListCompSelect(id)}/>
          </div>
          <div styleName="content_right">

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
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
