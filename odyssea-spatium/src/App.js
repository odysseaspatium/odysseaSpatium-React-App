import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';


import Notfound from "./composant/NotFound/NotFound";
import Acceuil from "./composant/Acceuil/Acceuil";
import NavBar from "./composant/NavBar/NavBar";
import Panier from "./composant/Panier/Panier"; 
import Historique from "./composant/Historique/Historique"; 
import Voyage from "./composant/Voyage/Voyage"; 

class App extends Component {

  render() {
  
    return (

      <Router history={createBrowserHistory()}>
      <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Acceuil} />
            <Route  path="/panier" component={Panier} />
            <Route  path="/historique"  component={Historique}/>
            <Route  path="/voyage"  component={Voyage}/>
            <Route  path="/acceuil"  component={Acceuil}/>
            <Route component={Notfound} />
         
          </Switch>
        </div>
    </Router>
    );
  }
}

export default App;
