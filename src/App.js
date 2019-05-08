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
      captions: ["The captions will be displayed here", "Copy script from storyboard and click 'Load Clipboard' to load text here", "Play the Video and wait for specific part where the caption is said, and click 'Mark Cue Point'"],
      curCaptionIndex: 0,
      cuePoints: [],
      currentVideoTime: 0
     }
  }

  loadClipBoard = () =>  {
   let newCaptions = [];
   let newCuePoints = [];

   //Load Text from the Clipboard
    navigator.clipboard.readText().then(clipText => {

      //Split the text per line and remove instances of these patterns (1), (1a), (2)... and so on

      clipText.split("\n").map( item => ( 
           item.trim() == "" ? null : newCaptions.push( item.trim().replace( /\(\d*\w\)/, "" ) )  ) 
      );

      newCaptions.map( item =>  newCuePoints.push(0) );

      console.log(newCuePoints);
      this.setState({
        captions: newCaptions,
        curCaptionIndex: 0        
      })
     }
    ) 
  }

  prevCaption = () => {
    if(this.state.curCaptionIndex > 0){
      this.setState( {
        curCaptionIndex: this.state.curCaptionIndex - 1      
      })
    }
  }

  nextCaption = () => {
    if(this.state.curCaptionIndex < this.state.captions.length-1){
      this.setState( {
        curCaptionIndex: this.state.curCaptionIndex + 1      
      })
    }
  }

  markCuePoint = () =>  {
    console.log("marking");
    //Set CuePoint 
  let newCuePoints =  [...this.state.cuePoints];
    newCuePoints[this.state.curCaptionIndex] = this.state.currentVideoTime
    let increment = 1;
    if(this.state.curCaptionIndex < this.state.captions.length-1){
        increment = 1;
    }else{
      increment = 0;
    }
      this.setState( {
        curCaptionIndex: this.state.curCaptionIndex + increment  ,
        cuePoints: newCuePoints
      })
     
    
  }
  
  setCurrentIndex = (index) =>{
    this.setState( {
      curCaptionIndex: index    
    })
  }

    
  updateVideoTime = (time) =>{
   // console.log(e.target)

    this.setState( {
      currentVideoTime: time  
    })
  }

  
  
  render() {   
    return ( 
       <div className="App">
          <NavBar 
            loadClipBoard={this.loadClipBoard} 
            markCuePoint={this.markCuePoint}
            prevCaption={this.prevCaption}
            nextCaption={this.nextCaption}
            />

          <LineBar />
          <CaptionBar currentCaption={this.state.captions[this.state.curCaptionIndex]}
              index={this.state.curCaptionIndex} total={this.state.captions.length}
          />
          <VideoBar captions={this.state.captions} activeIndex={this.state.curCaptionIndex} setCurrentIndex={this.setCurrentIndex}
            updateVideoTime={this.updateVideoTime}
          />
      </div> 
    );
  }
}
 
export default App;
 