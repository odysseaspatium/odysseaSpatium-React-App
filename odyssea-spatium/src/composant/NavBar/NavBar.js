import React, { Component } from 'react';
import {Nav, Navbar, Form, Button} from 'react-bootstrap';
import ReactModalLogin from "react-modal-login";
import { Link } from 'react-router-dom'
import {axios} from 'axios'
import './NavBar.css';

function checkMail(email,elem){
    /* Une adresse e-mail, c'est
  * des caractères : lettres, chiffres, points et tirets (hauts ou bas),
  * un symbole "arobase" @,
  * des caractères : comme au début ; au moins deux,
  * un point,
  * des caractères : de 2 à 4 lettres minuscules.
  */
 let expRegMail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
 if (!expRegMail.test(String(email).toLowerCase())){
   elem.errorMsg="Votre mail est incorrect"
   return false;
 }
 return true;
}
function checkMailMdp(email,mdp,elem){
  if(!checkMail(email,elem)) return false;
  /* Le mot de passe, c'est
  * des caractères: [a-zA-Z]
  * des chiffres : \d,
  * au moins un caractere special: [^A-Za-z0-9],
  * des une taille superieure ou egale a 6 : {6,}.
  */
  var listRe = [{
    re: /[a-zA-Z]/g,
    msg: "Votre mot de passe doit avoir des lettres en minuscule et majuscule"
  }, {
    re: /\d/g,
    msg: "Votre mot de passe doit avoir des chiffres"
  }, {
    re: /[^A-Za-z0-9]/g,
    count: 1,
    msg: "Votre mot de passe doit posséder au moins 1 caractère spécial"
  },
  {
    re: /^.{6,}$/,
    msg: "Votre mot de passe doit être plus grand ou égal à 6 caractères"
  }];
 
  for (var i = 0; i < listRe.length; i++) {
    var item = listRe[i];
    var match = mdp.match(item.re);
    if (null === match || match.length < item.count) {
      elem.errorMsg=item.msg;
      return false;
    }
  }
  return true;
}

function checkForm(nom,prenom,email,mdp,elem){
  /* Explication exp reguliere
  * ^ : Debut de chaine
  * [a-z] : De a à z compris
  *  + : {1,} Au moins une fois
  * $ : Fin de chaine 
  */
    let expRegId = /^[a-z]+$/;
    if(!expRegId.test(nom)){
      elem.errorMsg="Votre nom doit uniquement contenir des lettres"
      return false;
    }
    if(!expRegId.test(prenom)) {
      elem.errorMsg="Votre prenom doit uniquement contenir des lettres"
      return false;
      }
    if(!checkMailMdp(email,mdp,elem))return false;
    return true;
}
class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loggedIn: null,
      loading: false,
      error: null,
      initialTab: null,
      errorMsg: null,
      recoverPasswordSuccess: null,
    };
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
      this.setState({
        error:false
      })
      /*
      axios({
        method: 'post',
        url: 'http://localhost:4000/auth',
        headers: {
            'crossDomain': true,  //For cors errors 
            'Content-Type': 'application/json'
        },
        data: {
            login: email,
            mdp: password
        }
        }).then(res => {
            if (res.data === "failed"){
              this.setState({
                error: true
              })
            }
            
            else {
              console.log(res.data);
              this.onLoginSuccess(res.data.username);
              this.props.updateuser(res.data.id);
            }
        });
    */
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
        url: 'http://',
        method: 'post',
        data: {
          nom: nom,
          prenom:prenom,
          email:email,
          motdepasse:mdp,
        }
      }).then(res => {
        if (res.data === "failed"){
          this.setState({
            error: true
          })
        }
        
        else {
          this.onLoginSuccess(nom);
        }  
    });
      /*
      axios({
        method: 'post',
        url: 'http://localhost:4000/register',
        headers: {
            'crossDomain': true,  //For cors errors 
            'Content-Type': 'application/json'
        },
        data: {
            login: email,
            mdp: password,
            prenom: login
        }
        }).then(res => {
            if (res.data === "failed"){
              this.setState({
                error: true
              })
            }
            
            else {
              this.onLoginSuccess(login);
            }  
        });
      //this.onLoginSuccess('form');
    */
      
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

  onLoginSuccess(method, response) {

    this.closeModal();
    this.setState({
      loggedIn: method,
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

  render() {

    const loggedIn = this.state.loggedIn;
    const isLoading = this.state.loading;

    return (
      
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Odyssea Spatium</Navbar.Brand>
          <Nav className="mr-auto">
            <li className="acceuil"><Link to="/acceuil">Acceuil</Link></li>
          </Nav>
          {loggedIn ? (
            <div className="login">
              {loggedIn}
            </div>
          ) : (
            <Form inline>
              <Button onClick={() => this.openModal()} variant="outline-info">Connexion</Button>
            </Form>
          )}
        </Navbar>
        <br />
        <ReactModalLogin
        visible={this.state.showModal}
        onCloseModal={this.closeModal.bind(this)}
        loading={isLoading}
        initialTab={this.state.initialTab}
        error={this.state.error}
        tabs={{
          afterChange: this.afterTabsChange.bind(this)
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
