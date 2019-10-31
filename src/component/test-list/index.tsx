import React from 'react';

interface ListProps {
  dataList: any[],
}

interface ListState {
  
}

export class List extends React.Component<ListProps, ListState> {

  render() {
    const { dataList = [] } = this.props;
    return (
      <div>
        <p>这是src下的样例</p>
        <ul>
          { dataList.map(function(item, index){
            return ( <li key={index}>{item.name}</li> )
          }) }
        </ul>
      </div>
    )
  }
}