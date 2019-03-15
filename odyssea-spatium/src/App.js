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
      utilisateur:null,
    }
  }
  updateuser = (id) => {
    this.setState({ utilisateur: id });
  }
  render() {
    return (
      <Router history={createBrowserHistory()} utilisateur={this.state.utilisateur} >
      <div>
          <NavBar updateuser={this.updateuser} />
          <Switch>
            <Route exact path="/" component={Acceuil} />
            <Route  path={Parametres.URL_ROUTE+"/index.html"} component={Acceuil} />
            <Route  path={Parametres.URL_ROUTE+"/panier"} component={Panier} />
            <Route  path={Parametres.URL_ROUTE+"/historique"}  component={Historique}/>
            <Route  path={Parametres.URL_ROUTE+"/historiquePanier"}  component={HPanier}/>
            <Route  path={Parametres.URL_ROUTE+"/historiqueCommentaires"}  component={HCommentaires}/>
            <Route  path={Parametres.URL_ROUTE+"/voyage"}  component={Voyage}/>
            <Route  path={Parametres.URL_ROUTE+"/acceuil"}  component={Acceuil}/>
            <Route component={Notfound} />
         
          </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
