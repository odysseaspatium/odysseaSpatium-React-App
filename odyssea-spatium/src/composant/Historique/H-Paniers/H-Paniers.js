import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../../Param';
import axios from 'axios';
import './H-Paniers.css';

class HPaniers extends Component {
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
      id_Panier:visiteur.id_Panier,
      panier:null,
    }
  }

  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/RecupererPanier',
      method: 'post',
      data: {
        id_Utilisateur : this.state.id_Utilisateur,
        id_Panier : this.state.id_Panier,
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        let data=[];
        for(let index=0; index<res.data.length;index++){
          data.push("<p>"+res.data[index].annonce+"</p><p>"+res.data[index].prix+"</p><hr/>");
        }
        this.setState({panier:data});
      }
    });
  }
    render() {
      const loggedIn=this.state.id_Utilisateur;
    
      return (
        <div>
        {loggedIn ? (
          <div>
            <div>Historique Panier</div>
            <hr/>
            <div>{this.state.panier}</div>
          </div>
          ):(
            this.state.history.push({pathname:Parametres.URL_ROUTE+'/404'}
            ))};
      </div>
      );
    }
  }
  
  export default withRouter(HPaniers);