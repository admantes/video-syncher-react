import React, { Component } from 'react';
import {
    ORANGE_D2 
} from '../config';

 
class CaptionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div style={{marginTop:-18}} > 
            <div className="row" style={{height:50}}>
               
                <div className="col s3 m1 cyan lighten-1 center-align " style={{padding:10, height:50}}>                     
                      <span>  {this.props.index+1} of {this.props.total}  </span>     
                </div>
 

                <div className="col s9 m10 cyan lighten-3 valign-wrapper"  style={{padding:10, height:50}}>                    
                          <span><h6>{this.props.currentCaption}</h6></span>  
                </div> 

                <div className="col s9 m1 cyan darken-3 center-align "  style={{padding:10, height:50}}>    
                             <a className="waves-effect waves-light btn-small" onClick={this.props.decreaseIndent}><i className="material-icons">arrow_back</i></a>
                             <a className="waves-effect waves-light btn-small" onClick={this.props.increaseIndent}><i className="material-icons">arrow_forward</i></a>
                 </div> 

            </div> 
        
        </div>
      

        );
    }
}
 
export default CaptionBar;