import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../../Param';
import axios from 'axios';
import './H-Paniers.css';

class HPaniers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:this.props.history,
      Utilisateur:JSON.parse(sessionStorage.getItem("utilisateur")),
      panier:null,
    }
  }

  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id : this.state.Utilisateur.id,
        route: 'HistoriquePanier/getHistorique',
      }
    }).then(res => {
      console.log(res.data);
      if (res.data !== ""){
        axios({
          url: Parametres.URL_TOMCAT+'/Bridge',
          method: 'post',
          data: {
            historique : res.data,
            route: 'HistoriquePanier/getVoyages',
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
    });
  }
    render() {
      return (

        <div>
        {this.state.Utilisateur ? (
          <>
          <div>
            <div>Historique Panier</div>
            <hr/>
            <div>{this.state.panier}</div>
          </div>
          </>
          ):(
          this.state.history.push({
            pathname: Parametres.PREFIX_URL+'/acceuil',
          })
        )}
        </div>
      );
    }
  }
  
  export default withRouter(HPaniers);