import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../../Param';
import axios from 'axios';
import './H-Paniers.css';

class HPaniers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:this.props.history,
      Utilisateur:sessionStorage.getItem("utilisateur"),
      panier:null,
    }
  }

  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/RecupererPanier',
      method: 'post',
      data: {
        id_Utilisateur : this.state.Utilisateur.id_user,
        id_Panier : this.state.Utilisateur.id_panier_user,
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
      return (
          <div>
            <div>Historique Panier</div>
            <hr/>
            <div>{this.state.panier}</div>
          </div>
      );
    }
  }
  
  export default withRouter(HPaniers);