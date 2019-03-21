import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../Param';
import axios from 'axios';
import './Panier.css';

class Panier extends Component {
  constructor(props) {
    super(props);
    let props_location_id_voyage=null;
    let props_location_prix=null;
    let props_location_id_panier=null;
    if(this.props.location.state!=null){
      props_location_id_voyage=this.props.location.state.id_Voyage;
      props_location_prix=this.props.location.state.prix;
      props_location_id_panier=this.props.location.state.id_panier;
    }
    this.state = {
      history:this.props.history,
      Utilisateur:JSON.parse(sessionStorage.getItem("utilisateur")),
      id_Voyage:props_location_id_voyage,
      prix:props_location_prix,
      id_panier:props_location_id_panier,
      panier:null,
      tabVoyages:null,
      prix_Golbal:0,
    }
  }
  componentWillMount(){
    if(this.state.id_Voyage==null){
      axios({
        url: Parametres.URL_TOMCAT+'/Bridge',
        method: 'post',
        data: {
          id_utilisateur : this.state.Utilisateur.id,
          route: 'Panier/idPanier',
        }
      }).then(res => {
        if (res.data !== ""){
          this.setState({id_panier:res.data[0].id_panier_user});
          this.affichercontenu();
        }
      });
    }else{ 
      this.affichercontenu();
    }
  }
  affichercontenu(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_panier : this.state.id_panier,
        route: 'Panier/contenu',
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        let data=[];
        let voyages_tmp=[]
        let prix_calcul=0;
        for(let index=0; index<res.data.length;index++){
          voyages_tmp.push(res.data[index].id_voyage);
          prix_calcul=prix_calcul+res.data[index].prix_voyage;
          data.push(<div id={res.data[index].id_article}><p>Nom du voyage : {res.data[index].nom_voyage}, prix : {res.data[index].prix_voyage}</p><hr/></div>);
        }
        this.setState({panier:data});
        this.setState({tabVoyages:voyages_tmp});
        this.setState({prix_Golbal:prix_calcul});
      }
    });
  }
  supprimer_voyage(id_article){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_article : id_article,
        route: 'Article/supprimerVoyage'
      }
    }).then(res => {
      document.getElementById(id_article).style.display="none";
    });
  }
  validerPanier(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_panier : this.state.id_panier,
        id_utilisateur:this.state.Utilisateur.id,
        voyages:this.state.tabVoyages,
        prix:this.state.prix_Golbal,
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
              <button id="Valider_Panier" type="submit" value="Valider" onClick={this.validerPanier.bind(this)}>Valier panier</button>
            </div>
        </div>
      );
    }
  }
  
  export default withRouter(Panier);