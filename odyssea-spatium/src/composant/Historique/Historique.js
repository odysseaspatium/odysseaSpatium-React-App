import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../Param';
import './Historique.css';

class Historique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:this.props.history,
      Utilisateur:sessionStorage.getItem("utilisateur"),
    }
  }
  redirectCommentaires(){
    this.state.history.push({
      pathname:Parametres.PREFIX_URL+'/historiqueCommentaires',
      history:this.state.history
    })

  }
  redirectPaniers(){
    this.state.history.push({
      pathname:Parametres.PREFIX_URL+'/historiquePanier',
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
  