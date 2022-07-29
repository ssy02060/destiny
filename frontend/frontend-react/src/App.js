import react, { Component } from 'react'
import MyComponent from './MyComponent';

class App extends Component {
  render() {
    const name = '상윤';
    return <MyComponent name={name}>리액트</MyComponent>
  }
}

export default App;
