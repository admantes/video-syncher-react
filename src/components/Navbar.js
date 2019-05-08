import React, { Component } from 'react';
import {
    BTN_ORANGE_D2,
    BTN_AMBER_D3
} from '../config';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="navbar-fixed">
                <nav className="blue-grey darken-1" role="navigation">
                <div className="nav-wrapper"><a id="logo-container"  className="brand-logo">  &nbsp; Video Timer</a>
                <ul className="right hide-on-med-and-down">
                    <li> <a className={BTN_ORANGE_D2} onClick={this.props.generateCode}><i className="material-icons left">archive</i>Generate Code</a></li>
                    <li> <a className={BTN_ORANGE_D2} onClick={this.props.loadClipBoard}><i className="material-icons left">archive</i>Load Clipboard</a></li>
                    <li> <a className={BTN_AMBER_D3}  onClick={this.props.prevCaption}><i className="material-icons left">arrow_back</i>Previous Caption</a></li>
                    <li>  <a className={BTN_AMBER_D3}  onClick={this.props.nextCaption}><i className="material-icons left">arrow_forward</i>Next Caption</a></li>
                    <li>  <a className={BTN_ORANGE_D2} onClick={this.props.markCuePoint}><i className="material-icons left">check_box</i>Mark Cuepoint</a></li>

                    </ul>
                <ul id="nav-mobile" className="sidenav">
                    <li><a className={BTN_ORANGE_D2}><i className="material-icons left">event</i>Load Clipboard</a></li>
                </ul>
                <a  data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                </div>
            </nav>
            </div>
         );
    }
}
 
export default NavBar;