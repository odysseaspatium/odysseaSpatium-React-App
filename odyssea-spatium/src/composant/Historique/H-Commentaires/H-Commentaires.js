import React, { Component } from 'react';
import { isNullOrUndefined } from 'util';
import {withRouter} from 'react-router-dom';
import * as Parametres from '../../../Param';
import axios from 'axios';
import './H-Commentaires.css';

class HCommentaires extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history:this.props.history,
      id_Utilisateur:sessionStorage.getItem("utilisateur").id_user,
      Commentaires:null,
    }
  }
  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/RecupererCommentaires',
      method: 'post',
      data: {
        id_Utilisateur : this.state.id_Utilisateur,
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        let data=[];
        for(let index=0; index<res.data.length;index++){
          data.push("<p>"+res.data[index].commentaire+"</p>");
          try{
            data.push("<img src='"+res.data[index].image+"'></img>");
          }catch(e){}
          data.push("<hr/>");
        }
        this.setState({Commentaires:data});
      }
    });
  }
    render() {
    
      return (
          <div>
            <div>Historique Commentaire</div>
            <hr/>
            <div>{this.state.Commentaires}</div>
          </div>
      );
    }
  }
  
  export default withRouter(HCommentaires);
  