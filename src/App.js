import React, { Component } from 'react'
import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';
export class App extends Component {

  render() {// render is a lifecycle method used to render jsx code on the screen 
    return (
      <div>
        <NavBar/>
        <News/>
      </div>
    )
  }
}

export default App