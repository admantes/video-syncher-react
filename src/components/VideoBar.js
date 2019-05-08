import React, { Component } from 'react';
import ReactDOM from "react-dom";

class VideoBar extends Component {
    constructor(props) {
        super(props);
        let activeStyle = "";
        this.state = {
            surferInitialized: false           
          }
    }

    componentDidMount(){
        
      //Initialize Wave surfer once
      if(!this.state.surferInitialized){
            var wavesurfer = window.WaveSurfer.create({
                container: '#waveform',
                waveColor: 'violet',
                progressColor: 'purple',
                fillParent: true
            });
            
            wavesurfer.load('video.mp4');

            this.setState(  {
                surferInitialized: true   
               })
        }

        let videoElement = document.getElementById("myVideo");

        videoElement.ontimeupdate = () => {
          this.props.updateVideoTime(videoElement.currentTime);
        }

    }

   

    render() { 
        return ( 
            <div className="section">
 
            <div className="row">
              <div className="col s12 m6">
               
                   
                <video id="myVideo"  controls width="900" >
                    <source src="video.mp4?token=1321654asdfas" type="video/mp4" />
                   
                    Your browser does not support HTML5 video.
                  </video>
                 
                  <div id="waveform"></div>
                
              </div>
      
              <div className="col s12 m6">
                <ul className="collection with-header">
                         
                 {
                     this.props.captions.map(
                         (item, index) => (                       
                            <li  className={"collection-item " + (( this.props.activeIndex == index) ? " blue lighten-4" : "") }
                             key={Math.random()+index.toString()} onClick={this.props.setCurrentIndex.bind(null,index)} >
                             <div className="editable">  {item}
                             <a  className="secondary-content"><i className="material-icons">create</i></a></div></li>               
                            )
                     )  

                 }
                  
                </ul>

                <ul className="collection with-header">
                    <li className="collection-header"><h5>Output</h5></li>
                   <li className="collection-item">
                   <textarea value={this.props.generatedCode} style={{height:200}}>
                   {}
                   </textarea></li>
                </ul>
              </div>
      
             
      
          </div>
          
        </div>
        );
    }
}
 
export default VideoBar;