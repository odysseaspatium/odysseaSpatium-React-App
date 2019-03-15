import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../Param';
import axios from 'axios';
import './Panier.css';

class Panier extends Component {
  constructor(props) {
    super(props);
    let visiteur=null;
    console.log(this.props);
    if(!isNullOrUndefined(this.props.state)){
      visiteur = this.props.state.utilisateur;
    }
    this.state = {
      history:this.props.history,
      id_Utilisateur:visiteur.id,
      id_Voyage:this.props.state.id_Voyage,
      prix:this.tprops.state.prix,
      panier:null,
      id_Panier:visiteur.id_panier,
    }
  }
  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/AjoutPanier',
      method: 'post',
      data: {
        id_Voyage: this.state.id_Voyage,
        id_Utilisateur : this.state.id_Utilisateur,
        id_Panier : this.state.id_Panier,
      }
    });
    axios({
      url: Parametres.URL_TOMCAT+'/RecupererPanier',
      method: 'post',
      data: {
        id_Panier : this.state.id_Panier,
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        let data=[];
        for(let index=0; index<res.data.length;index++){
          data.push("<p>"+res.data[index].annonce+"</p><hr/>");
        }
        this.setState({panier:data});
      }
    });
  }
  validerPanier(){
    axios({
      url: Parametres.URL_TOMCAT+'/ValiderPanier',
      method: 'post',
      data: {
        id_Utilisateur : this.state.id_Utilisateur,
        id_Panier : this.state.id_Panier,
      }
    }).then(res => {
      this.state.history.push({
        pathname: Parametres.PREFIX_URL+'/acceuil',
      });
    });
  }
    render() {
    
      return (
        <div>
          <div>Panier</div>
          <hr/>
          <div>
            {this.state.panier}
          </div>
          <div>                 
            <button id="Valider_Panier" type="submit" value="Valider" onClick={this.validerPanier}></button>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(Panier);