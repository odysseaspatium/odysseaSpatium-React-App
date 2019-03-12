import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import './Historique.css';

class Historique extends Component {
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
  redirectCommentaires(){
    this.state.history.push({
      pathname:'/historiqueCommentaires',
      id_Utilisateur:this.state.id_Utilisateur,
      history:this.state.history
    })

  }
  redirectPaniers(){
    this.state.history.push({
      pathname:'/historiquePanier',
      id_Utilisateur:this.state.id_Utilisateur,
      history:this.state.history
    })
  }
    render() {
    
      return (
  <table>
    <thead>
      <tr>
        <td colSpan="2">
          <h1>Choisir L'historique à afficher</h1>
        </td>
      </tr>
      <tr>
        <td className='titres'>
          <h1>L'Historique des Commentaires</h1>
        </td>
        <td>
          <h1>L'Historique des Paniers</h1>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr className="ligneBouttons">
        <td><button className="commentaires" onClick={this.redirectCommentaires.bind(this)}></button></td>
        <td><button className="paniers" onClick={this.redirectPaniers.bind(this)}></button></td>
      </tr>
    </tbody>
  </table>
      );
    }
  }
  
  export default withRouter(Historique);
  