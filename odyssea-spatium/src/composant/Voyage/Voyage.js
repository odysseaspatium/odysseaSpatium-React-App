import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import {withRouter} from 'react-router-dom';
import './Voyage.css';
const PREFIX_URL = '';
const image=`${PREFIX_URL}saturn.jpg`;

class Voyage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:this.props.history,
      id:this.props.location.state.id_Voyage,
     
    }
  }
  _redirect(){
    return null;
  }
    render() {
    
      return (
        <div>
        <div>
          bla<br/>
          bla<br/>
          bla<br/>
          bla<br/>
          bla<br/>
          bla<br/>
          bla<br/>
          bla<br/>
        </div>
          <Parallax bgImage={image} strength={500} >
            <div style={{ height: '400px' }}>
              <div>Voyage n°{this.state.id}</div>
            </div>
          </Parallax>
          <div>
            bla<br/>
            bla<br/>
            bla<br/>
            bla<br/>
            bla<br/>
            bla<br/>
            bla<br/>
            bla<br/>
            <div>
             <button className='image-cadis' type="button"  aria-label="Ajout cadis" onClickCapture={this._redirect.bind(this)}></button>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(Voyage);