import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {BTN_AMBER_D3} from "../config.js";
class VideoBar extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            surferInitialized: false           
          }
    }

    componentDidMount(){
        
      var videoElement = document.getElementById("myVideo");

      //Initialize Wave surfer once
      if(!this.state.surferInitialized){
            var wavesurfer = window.WaveSurfer.create({
                container: '#waveform',
                waveColor: 'violet',
                progressColor: 'purple',
                fillParent: true,
                backend: 'MediaElement'
            });
              
            wavesurfer.load(videoElement);

            this.setState(  {
                surferInitialized: true   
               })
        }

       

        videoElement.ontimeupdate = () => {
          this.props.updateVideoTime(videoElement.currentTime);
        }

    }

   generateEmptySpace = (count) =>{
     let sp = "";
    for (let i = 0; i < count; i++) {
      sp += ">";
    }
    return sp;
   }

    render() { 
        return ( 
            <div className="section">
 
            <div className="row">
              <div className="col s12 m6">
                                
                <video id="myVideo"  controls width="850" src="video.mp4">
                  
                  </video>
                 
                  <div id="waveform"></div>                
				
				  
				  {"Preview Mode"}
				  <div className="switch">
					<label>
					{"Off"}
					  <input type="checkbox" onChange={this.props.previewModeChange}/>
					  <span className="lever"></span>
					 	{"On"}
					</label>
				  </div>   
              </div>
      
              <div className="col s12 m6">
                       
                 {
                     this.props.captions.map(
                         (item, index) => (                       
                            <div className={"card-panel "+ (( this.props.activeIndex == index) ? " blue lighten-4" : "") }
                             key={Math.random()+index.toString()} onClick={this.props.setCurrentIndex.bind(null,index)} >
                            <div>                              
                             <span className="badge  light-green darken-2 white-text"> {this.props.cuePoints[index]} </span>
                            <span style={{color:"#F00"}}> 
                            { 
                              this.generateEmptySpace(this.props.indents[index])
                              }
                            </span>  <span className="input-field"> {item} </span>
                               <a  className="secondary-content"><i className="material-icons">create</i></a></div>
                             </div>               
                            )
                     )  
                     
                         }
                

                <ul className="collection with-header">
                    <li className="collection-header"><h5>Output</h5></li>
                    <li className="collection-item">
                       <textarea value={this.props.generatedCode} style={{height:200}} onChange={this.props.outputUpdate}/> 
                   </li>
				     <li className="collection-item">
					 <a className={BTN_AMBER_D3}  onClick={this.props.loadCode}><i className="material-icons left">arrow_forward</i>Load Code</a> 
					 </li>
				  
                </ul>
              </div>
      
             
      
          </div>
          
        </div>
        );
    }
}
 
export default VideoBar;