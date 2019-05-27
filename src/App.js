import React, { Component } from 'react';
import NavBar from './components/Navbar';
import LineBar from './components/LineBar';
import CaptionBar from './components/CaptionBar';
import VideoBar from './components/VideoBar';

import {replaceChars} from './helpers';
import {INDENT_VALUES} from './config';

import './App.css';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      captions: ["The captions will be displayed here", "Copy script from storyboard and click 'Load Clipboard' to load text here", "Play the Video and wait for specific part where the caption is said, and click 'Mark Cue Point'"],
      curCaptionIndex: 0,
      cuePoints: [],
      currentVideoTime: 0,
      indents: [],
      bulletTypes: [],
      generatedCode: "",
	  previewMode: false
     }
  }

  loadClipBoard = () =>  {
   let newCaptions = [];
   let newCuePoints = [];
   let newIndents = []; 
   let newBullets = [];

   //Load Text from the Clipboard
    navigator.clipboard.readText().then( clipText => {

      //Split the text per line and remove instances of these patterns (1), (1a), (2)... and so on

      clipText.split("\n").map( item => ( 
           item.trim() === "" ? null : newCaptions.push( item
            .trim()
            .replace( /\(\d*\w\)/, "" )            
            )  ) 
      );

      newCaptions.forEach( item => {
         newCuePoints.push(0); 
         newIndents.push(0);
         newBullets.push(0);
        });

      console.log(newCuePoints);
      this.setState({
        captions: newCaptions,
        curCaptionIndex: 0,
        cuePoints: newCuePoints,
        indents: newIndents,
        bulletTypes: newBullets,
        generatedCode: ""        
      })
     }
    ) 
  }

  generateCode = () => {
    console.log("generating code");
    let genCode = "";
    let kpArr = "var kpArr = [";
    let kpTrackArr = "var kpTrackArr = [";
    let kpIndentArr = "var kpIndentArr = [";
    let bulletType = "var bulletType = [";

    for(let i=0; i<this.state.captions.length-1; i++){
      
    }

    this.state.captions.forEach(
       ( item, index ) => {
        if(index === this.state.captions.length-1){
          kpArr += "'" + replaceChars(item) + "']; \n ";
          kpTrackArr += this.state.cuePoints[index] + "]; \n ";
          kpIndentArr +=  INDENT_VALUES[this.state.indents[index]]  + "]; \n ";
          bulletType +=  "1]; \n ";
        }else{
          kpArr += "'" + replaceChars(item) + "', ";
          kpTrackArr += this.state.cuePoints[index] + ",";
          kpIndentArr +=  INDENT_VALUES[this.state.indents[index]]  + ",";
          bulletType +=  "1,";
        }

      }
    )
    
    genCode = kpArr + kpTrackArr + kpIndentArr + bulletType;
    console.log(genCode);
    this.setState(
      {
        generatedCode: genCode
      }
    );

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
    newCuePoints[this.state.curCaptionIndex] = ( this.state.currentVideoTime - 0.3 ).toFixed(2);
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
  
  
  increaseIndent = () =>{
    let newIndents = [...this.state.indents];
    newIndents[this.state.curCaptionIndex] = this.instantiateWhenNull( newIndents[this.state.curCaptionIndex] + 1 );
    this.setState( {
      indents: newIndents
    })
  }

  decreaseIndent = () =>{
    let newIndents = [...this.state.indents];
    newIndents[this.state.curCaptionIndex] = this.instantiateWhenNull( newIndents[this.state.curCaptionIndex] - 1);

    this.setState( {
      indents: newIndents
    })
  }

  instantiateWhenNull = (val) => {
    console.log(val);
    return ( val === undefined || isNaN(val) || val < 0 ? 0 : val);
  }
  
  setCurrentIndex = (index) =>{
    this.setState( {
      curCaptionIndex: index    
    })
  }

    
  updateVideoTime = (time) =>{
     console.log(time)
    //time = time.toFixed(2);
    this.setState( {
      currentVideoTime: time
    })
	
	if(this.state.previewMode){
		this.previewKPSynch(time);
	}
  }
  
  //Preview KP Synching
  previewKPSynch = (time)=>{
	 for(let i=0;i<this.state.cuePoints.length;i++){
      if(time > this.state.cuePoints[i]){
        this.setState({
              curCaptionIndex: i  
        });
      }
    }  
  }
  
  previewModeChange = ()=>{
	  this.setState({
		  previewMode: !this.state.previewMode
	  });
  }
  
  loadCode = () => {
	  if(this.state.generatedCode.trim() !== ""){
		  var kpArr = [], kpTrackArr = [], kpIndentArr = [], bulletType = [];
		 
		 let list = this.state.generatedCode.split("var ");
		 
		 for(var item of list){
			if(item != ""){
				 eval( item );
				 console.log("var " + item );
			}
		 }
		 
		  let newCaptions = kpArr;
		  
		  this.setState({
			  captions: kpArr,
			  cuePoints: kpTrackArr,
			  indents: kpIndentArr,
			  bulletTypes: bulletType
		  });
		  console.log(bulletType );
		 
		  
	  }
	  
  }

outputUpdate = (e) => {
	this.setState({
		generatedCode: e.target.value		
	});	
}
  
  
  render() {   
    return ( 
       <div className="App">
          <NavBar 
            loadClipBoard={this.loadClipBoard} 
            markCuePoint={this.markCuePoint}
            prevCaption={this.prevCaption}
            nextCaption={this.nextCaption}
            generateCode={this.generateCode}
            />

          <LineBar />
          <CaptionBar currentCaption={this.state.captions[this.state.curCaptionIndex]}
              index={this.state.curCaptionIndex} total={this.state.captions.length}
              increaseIndent={this.increaseIndent}
              decreaseIndent={this.decreaseIndent}
          />
          <VideoBar captions={this.state.captions} 
            activeIndex={this.state.curCaptionIndex} 
            setCurrentIndex={this.setCurrentIndex}
            cuePoints={this.state.cuePoints}
            updateVideoTime={this.updateVideoTime}
            generatedCode={this.state.generatedCode}
			loadCode={this.loadCode}
            indents={this.state.indents}
			outputUpdate={this.outputUpdate}
			previewModeChange={this.previewModeChange}
          />
      </div> 
    );
  }
}
 
export default App;
 