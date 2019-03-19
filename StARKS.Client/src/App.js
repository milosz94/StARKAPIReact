import React, { Component } from 'react';
import ScmTable from './components/ScmTable';
import './App.css';
class App extends Component {



  render() {
    return (
      <div className="App" style={{marginLeft:30}}>
      <ScmTable/>
      </div>
    );
  }
}

export default App;
