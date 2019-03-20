import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../Param';
import axios from 'axios';
import './Panier.css';

class Panier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:this.props.history,
      Utilisateur:sessionStorage.getItem("utilisateur"),
      id_Voyage:this.props.state.id_Voyage,
      prix:this.tprops.state.prix,
      panier:null,
    }
  }
  componentWillMount(){
    console.log(this.state.Utilisateur);
    
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_panier : this.state.Utilisateur.id_panier_user,
        route: 'Panier/contenu',
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        let data=[];
        for(let index=0; index<res.data.length;index++){
          data.push("<p>"+res.data[index].nom_voyage+"</p><p>"+res.data[index].prix_voyage+"</p><hr/>");
        }
        this.setState({panier:data});
      }
    });
  }
  validerPanier(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_panier : this.state.Utilisateur.id_panier_user,
        route: 'Panier/valider'
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