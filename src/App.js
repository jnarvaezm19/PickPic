import React, { Component } from 'react';
import './App.css';
import PickPic from './containers/album';

class App extends Component {

  render(){
    return (
      <div className="App">
        <PickPic/>
      </div>
    )
  }
}

export default App;
