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
      captions: ["Caption 1 and Good", "Caption 2 and bad"],
      curCaptionIndex: 0
     }
  }

  loadClipBoard = () =>  {
   let newCaptions = [];
    navigator.clipboard.readText().then(clipText => {
      clipText.split("\n").map( item => newCaptions.push(item));
      this.setState({
        captions: newCaptions
        
      })
     }
    )
        
 
  }

  render() {   
    return ( 
       <div className="App">
          <NavBar loadClipBoard={this.loadClipBoard}/>
          <LineBar />
          <CaptionBar currentCaption={this.state.captions[this.state.curCaptionIndex]}
              index={this.state.curCaptionIndex} total={this.state.captions.length}
          />
          <VideoBar captions={this.state.captions}/>
      </div> 
    );
  }
}
 
export default App;
 