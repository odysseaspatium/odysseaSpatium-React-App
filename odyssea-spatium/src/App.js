import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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
      id_Utilisateur:null,
    }
  }
  updateuser = (id) => {
    this.setState({ id_Utilisateur: id });
  }
  render() {
    return (
      <Router history={createBrowserHistory()} id_Utilisateur={this.state.id_Utilisateur} >
      <div>
          <NavBar updateuser={this.updateuser} />
          <Switch>
            <Route exact path="/" component={Acceuil} />
            <Route  path="/panier" component={Panier} />
            <Route  path="/historique"  component={Historique}/>
            <Route  path="/historiquePanier"  component={HPanier}/>
            <Route  path="/historiqueCommentaires"  component={HCommentaires}/>
            <Route  path="/voyage"  component={Voyage}/>
			<Route 	path="/agenceVoyageTomcat/index.html"	component={Acceuil}/>
            <Route  path="/acceuil"  component={Acceuil}/>
            <Route component={Notfound} />
         
          </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
