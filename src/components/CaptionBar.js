import React, { Component } from 'react';

class CaptionBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
            <div className="row">
                <div className="col s12 m12">
                    <ul className="collection">                 
                        <li className="collection-item   light-blue lighten-1"> 
                          <span> <h5>{this.props.index+1} of {this.props.total}</h5></span> 
                          <span>{this.props.currentCaption}</span></li>
                       
                      </ul>
                </div> 
                 
            </div> 
        
        </div>
      

        );
    }
}
 
export default CaptionBar;