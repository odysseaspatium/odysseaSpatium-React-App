import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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

      <BrowserRouter>
      <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Acceuil} />
            <Route exact path="/panier" component={Panier} />
            <Route exact path="/historique"  component={Historique}/>
            <Route exact path="/voyage"  component={Voyage}/>
            <Route exact path="/acceuil"  component={Acceuil}/>
            <Route component={Notfound} />
         
          </Switch>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
