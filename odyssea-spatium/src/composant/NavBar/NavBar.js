import React, { Component } from 'react';
import {Nav, Navbar, Form, Button} from 'react-bootstrap';
import ReactModalLogin from "react-modal-login";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import * as Parametres from '../../Param';

function checkMail(email,elem){
  
 if (!Parametres.EXP_REG_MAIL.test(String(email).toLowerCase())){
   elem.errorMsg="Votre mail est incorrect"
   return false;
 }
 return true;
}
function checkMailMdp(email,mdp,elem){
  if(!checkMail(email,elem)) return false;
 
  for (var i = 0; i <Parametres.LISTE_EXP_REG_MDP.length; i++) {
    var item = Parametres.LISTE_EXP_REG_MDP[i];
    var match = mdp.match(item.re);
    if (null === match || match.length < item.count) {
      elem.errorMsg=item.msg;
      return false;
    }
  }
  return true;
}

function checkForm(nom,prenom,email,mdp,elem){
    if(!Parametres.EXP_REG_NOM_PRENOM.test(nom)){
      elem.errorMsg="Votre nom doit uniquement contenir des lettres"
      return false;
    }
    if(!Parametres.EXP_REG_NOM_PRENOM.test(prenom)) {
      elem.errorMsg="Votre prenom doit uniquement contenir des lettres"
      return false;
      }
    if(!checkMailMdp(email,mdp,elem))return false;
    return true;
}
class NavBar extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      history:this.props.history,
      showModal: false,
      loggedIn: null,
      loading: false,
      error: null,
      initialTab: null,
      errorMsg: null,
      recoverPasswordSuccess: null,
    };
   
  }
  componentWillMount(){
    let data =JSON.parse(sessionStorage.getItem("utilisateur"));
    if(data!=null){
    console.log(data);
    console.log(data.nom);
    let nomprenom = data.nom+" "+data.prenom;
    console.log(nomprenom);
    
      this.setState({
        loggedIn : nomprenom,
        loading: false
      });
      
    console.log(this.state);
    }
  }
  onLogin() {
    this.startLoading();
   
    const email = document.querySelector('#email').value.toLowerCase();
    const mdp = document.querySelector('#mdp').value;
    this.errorMsg=null;
    if (!checkMailMdp(email,mdp,this)) {
      this.setState({
        error: true
      })
    }
    else{
      axios({
        method: 'post',
        url: Parametres.URL_TOMCAT+'/Connexion',
        data: {
          email: email,
          motdepasse:mdp,
        }
      }).then(res => {
        console.log(res);
        if (res.data === null){
          this.errorMsg="impossible de s'authentifier";
          this.setState({
            error: true
          })
        }else {
          this.setState({
            error:false
          });
          sessionStorage.setItem("utilisateur",JSON.stringify(res.data));
          this.onLoginSuccess(res.data.nom + " " +res.data.prenom);
        }
      });  
    }
    this.finishLoading();
  }

  onRegister() {
    const nom = document.querySelector('#nom').value.toLowerCase();
    const prenom = document.querySelector('#prenom').value.toLowerCase();
    const email = document.querySelector('#email').value.toLowerCase();
    const mdp = document.querySelector('#mdp').value;
    this.errorMsg=null;
    if (!checkForm(nom,prenom,email,mdp,this)) {
      this.setState({
        error: true
      })
    }
    
    else {
      this.setState({
        error:false
      })
      axios({
        url: Parametres.URL_TOMCAT+'/Inscription',
        method: 'post',
        data: {
          nom: nom,
          prenom:prenom,
          email:email,
          motdepasse:mdp,
        }
      }).then(res => {
        if (res.data === ""){
          this.errorMsg="impossible de s'enregistrer";
          this.setState({
            error: true
          })
        }else {
          sessionStorage.setItem("utilisateur",JSON.stringify(res.data));
          this.onLoginSuccess(nom+" "+prenom);
        }  
    });
      
    }
  }
      
  onRecoverPassword() {
    const email = document.querySelector('#email').value;
    this.errorMsg=null;
    if (!checkMail(email,this)) {
      this.setState({
        error: true,
        recoverPasswordSuccess: false
      })
    } else {
      this.setState({
        error: null,
        recoverPasswordSuccess: true
      });
    }
  }

  openModal(initialTab) {
    
    this.setState({
      initialTab: initialTab
    }, () => {
      this.setState({
        showModal: true,
      })
    });
  }

  onLoginSuccess(chaine, response) {
    this.closeModal();
    this.setState({
      loggedIn: chaine,
      loading: false
    })
  }

  onLoginFail(method, response) {

    this.setState({
      loading: false,
      error: response
    })
  }

  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  afterTabsChange() {
    this.setState({
      error: null,
      recoverPasswordSuccess: false,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }
  deconnection(){
    this.setState({
      loggedIn: null,
      loading: false
    })
    sessionStorage.removeItem("utilisateur");
    console.log(this.state.history.location.pathname)
    this.state.history.push({
      pathname: this.state.history.location.pathname,
    })
  }

  render() {

    const loggedIn = this.state.loggedIn;
    const isLoading = this.state.loading;

    return (
      
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand >Odyssea Spatium</Navbar.Brand>
          <Nav className="mr-auto">
            <li className="Lien"><Link to={Parametres.PREFIX_URL+"/acceuil"}>Accueil</Link></li>
            {loggedIn ? (
              <>
                <li className="Lien"><Link to={Parametres.PREFIX_URL+"/historique"}>Historique</Link></li>
                <li className="Lien"><Link to={Parametres.PREFIX_URL+"/panier"}>Panier</Link></li>
              </>
              ) : (null)}
          </Nav>
          
          {loggedIn ? (
            <>
              <div className="login">
                {loggedIn}
              </div>
              <>
                <Form inline>
                  <Button onClick={() => this.deconnection()} variant="outline-info">Deconnection</Button>
                </Form>
              </>
            </>
          ) : (
            <Form inline>
              <Button onClick={() => this.openModal()} variant="outline-info">Connexion</Button>
            </Form>
          )}
        </Navbar>
        <ReactModalLogin
        visible={this.state.showModal}
        onCloseModal={this.closeModal.bind(this)}
        loading={isLoading}
        initialTab={this.state.initialTab}
        error={this.state.error}
        tabs={{
          afterChange: this.afterTabsChange.bind(this),
          loginLabel: "Connexion",
          registerLabel: "S'enregistrer"
        }}
        loginError={{
          label: this.errorMsg
        }}
        registerError={{
          label: this.errorMsg
        }}
        recoverPasswordError={{
          label: this.errorMsg
        }}
        startLoading={this.startLoading.bind(this)}
        finishLoading={this.finishLoading.bind(this)}
        form={{
          onLogin: this.onLogin.bind(this),
          onRegister: this.onRegister.bind(this),
          onRecoverPassword: this.onRecoverPassword.bind(this),
          recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
            ? {
                label: "Un message a été envoyé sur votre boîte mail."
              }
            : null,
          recoverPasswordAnchor: {
            label: "Mot de passe oublié ?"
          },
          loginBtn: {
            label: "Se connecter"
          },
          registerBtn: {
            label: "S'inscrire"
          },
          recoverPasswordBtn: {
            label: "Envoyer"
          },
          loginInputs: [
            {
              containerClass: 'RML-form-group',
              label: 'Email',
              type: 'email',
              inputClass: 'RML-form-control',
              id: 'email',
              name: 'email',
              placeholder: 'Email',
            },
            {
              containerClass: 'RML-form-group',
              label: 'Mot de passe',
              type: 'password',
              inputClass: 'RML-form-control',
              id: 'mdp',
              name: 'mdp',
              placeholder: 'Mot de passe',
            }
          ],
          registerInputs: [
            {
              containerClass: 'RML-form-group',
              label: 'Nom',
              type: 'text',
              inputClass: 'RML-form-control',
              id: 'nom',
              name: 'nom',
              placeholder: 'Nom',
            },
            {
              containerClass: 'RML-form-group',
              label: 'Prénom',
              type: 'text',
              inputClass: 'RML-form-control',
              id: 'prenom',
              name: 'prenom',
              placeholder: 'Prénom',
            },
            {
              containerClass: 'RML-form-group',
              label: 'Email',
              type: 'email',
              inputClass: 'RML-form-control',
              id: 'email',
              name: 'email',
              placeholder: 'Email',
            },
            {
              containerClass: 'RML-form-group',
              label: 'Mot de passe',
              type: 'password',
              inputClass: 'RML-form-control',
              id: 'mdp',
              name: 'mdp',
              placeholder: 'Mot de passe',
            }
          ],
          recoverPasswordInputs: [
            {
              containerClass: 'RML-form-group',
              label: 'Email',
              type: 'email',
              inputClass: 'RML-form-control',
              id: 'email',
              name: 'email',
              placeholder: 'Email',
            }
          ],
        }}
        />
    </div>
    );
  };

}
export default NavBar;
