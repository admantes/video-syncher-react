import React, { Component } from 'react';
import NavBar from './components/Navbar'
import LineBar from './components/LineBar'
import CaptionBar from './components/CaptionBar'
import VideoBar from './components/VideoBar'

import './App.css';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      captions: ["Caption 1 and Good", "Caption 2 and bad"]
     }
  }
  render() {   
    return ( 
       <div className="App">
          <NavBar />
          <LineBar />
          <CaptionBar />
          <VideoBar captions={this.state.captions}/>
      </div> 
    );
  }
}
 
export default App;
 