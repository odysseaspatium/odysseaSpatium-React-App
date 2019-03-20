import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as Parametres from './Param';
import './App.css';


import Notfound from "./composant/NotFound/NotFound";
import Acceuil from "./composant/Acceuil/Acceuil";
import NavBar from "./composant/NavBar/NavBar";
import Panier from "./composant/Panier/Panier"; 
import Historique from "./composant/Historique/Historique"; 
import HCommentaires from "./composant/Historique/H-Commentaires/H-Commentaires"; 
import HPanier from "./composant/Historique/H-Paniers/H-Paniers"; 
import Voyage from "./composant/Voyage/Voyage"; 

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      utilisateur:sessionStorage.getItem("id_Utilisateur"),
    }
  }
  render() {
    const loggedIn=this.state.utilisateur;
    return (
      <Router history={createBrowserHistory()} >
      <div>
          <NavBar updateuser={this.updateuser} />
          <Switch>
            <Route exact path="/" component={Acceuil} />
            <Route  path={Parametres.PREFIX_URL+"/acceuil"}  component={Acceuil}/>
            <Route  path={Parametres.PREFIX_URL+"/index.html"} component={Acceuil} />
            <Route  path={Parametres.PREFIX_URL+"/voyage"}  component={Voyage}/>
            {loggedIn ? (
              <>
              <Route  path={Parametres.PREFIX_URL+"/panier"} component={Panier} />
              <Route  path={Parametres.PREFIX_URL+"/historique"}  component={Historique}/>
              <Route  path={Parametres.PREFIX_URL+"/historiquePanier"}  component={HPanier}/>
              <Route  path={Parametres.PREFIX_URL+"/historiqueCommentaires"}  component={HCommentaires}/>
              </>
            ) : (null)}
            <Route component={Notfound} />
         
          </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
