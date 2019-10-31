// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { List } from './component/test-list';

// const dataList = [
//   { name: 'hello' },
//   { name: 'world' },
//   { name: 'react' },
//   { name: 'react-dom' },
// ]

// class App extends React.Component {
//   render(){
//     return (
//       <div>123</div>
//     );
//   }
// }


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


import { test, UiComponent } from './test.tsx';

test('start');
test('hello');

if (ENV !== 'production') {
  console.log('dev');
  const rootElement = document.getElementById('root');
  const newElement = document.createElement('div');
  newElement.innerText = '这是一个div节点';
  rootElement.appendChild(newElement);
}



