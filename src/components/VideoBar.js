import React, { Component } from 'react';


class VideoBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surferInitialized: false
          }
    }

    componentDidMount(){
        if(!this.state.surferInitialized){
            var wavesurfer = window.WaveSurfer.create({
                container: '#waveform',
                waveColor: 'violet',
                progressColor: 'purple'
            });
            
            wavesurfer.load('video.mp4');

            this.setState(  {
                surferInitialized: true   
               })
        }
    }

    render() { 
        return ( 
            <div className="section">
 
            <div className="row">
              <div className="col s12 m6">
                <div className="icon-block">
                   
                <video id="myVideo"  controls width="620">
                    <source src="video.mp4?token=1321654asdfas" type="video/mp4" />
                   
                    Your browser does not support HTML5 video.
                  </video>
                 
                  <div id="waveform"></div>
                </div>
              </div>
      
              <div className="col s12 m6">
                <ul className="collection with-header">
                         
                 {
                     this.props.captions.map(
                         (item, index) => (
                            <li className="collection-item" key={Math.random()+index.toString()}><div> {item}<a  className="secondary-content"><i className="material-icons">create</i></a></div></li>               
                            )
                     )  

                 }
                 
                 
                </ul>
              </div>
      
             
      
          </div>
          
        </div>
        );
    }
}
 
export default VideoBar;