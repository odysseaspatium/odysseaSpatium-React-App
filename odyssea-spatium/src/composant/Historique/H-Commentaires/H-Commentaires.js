import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import './H-Commentaires.css';

class HCommentaires extends Component {
  constructor(props) {
    super(props);
    let visiteur=null;
    console.log(this.props);
    if(!isNullOrUndefined(this.props.state)){
      visiteur = this.props.state.id_Utilisateur;
    }
    this.state = {
      history:this.props.history,
      id_Utilisateur:visiteur,
    }
  }
    render() {
    
      return (
        <div>
          <div>Historique Commentaire</div>
          <hr/>
          <div></div>
        </div>
      );
    }
  }
  
  export default withRouter(HCommentaires);
  