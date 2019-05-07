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
            <div>
    
     
            <div className="row">
                <div className="col s3 m1">
                    <ul className="collection">                 
                        <li className={"collection-item " + ORANGE_D2} > 
                          <span>  {this.props.index+1} of {this.props.total} </span> 
                         </li>
                       
                      </ul>
                </div> 
                <div className="col s9 m11">
                    <ul className="collection">                 
                        <li className="collection-item   light-blue lighten-1"> 
                          
                          <span>{this.props.currentCaption}</span></li>
                       
                      </ul>
                </div> 
            </div> 
        
        </div>
      

        );
    }
}
 
export default CaptionBar;