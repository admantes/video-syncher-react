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
                          <span> <h5>1 of 6</h5></span> 
                          <span>This is the text</span></li>
                       
                      </ul>
                </div> 
                 
            </div> 
        
        </div>
      

        );
    }
}
 
export default CaptionBar;