import React, { Component } from 'react';
import {Nav, Navbar, Form, Button} from 'react-bootstrap';
import ReactModalLogin from "react-modal-login";
import { Link } from 'react-router-dom'
import './NavBar.css';

function checkMailMdp(email,mdp){
  let expRegMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!expRegMail.test(String(email).toLowerCase())){
    return false;
  }
  let expRegMdp = /([0-9]*)+([a-z]*)+([A-Z]*)/;
  if(mdp.length < 6 || !expRegMdp.test(mdp)) {
      return false;
  }
}

function checkForm(nom,prenom,email,mdp){
    let expRegId = /^\w+$/;
    if(!expRegId.test(nom) || !expRegId.test(prenom)) {
      return false;
    }
    if(!checkMailMdp(email,mdp))return false;
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
      recoverPasswordSuccess: null,
    };
  }
  onLogin() {
    this.startLoading();
   
    const email = document.querySelector('#email').value;
    const mdp = document.querySelector('#mdp').value;

    if (!email || !mdp || checkMailMdp(email,mdp)) {
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
    const nom = document.querySelector('#nom').value;
    const prenom = document.querySelector('#prenom').value;
    const email = document.querySelector('#email').value;
    const mdp = document.querySelector('#mdp').value;

    if (!email || !mdp || !nom || !prenom || !checkForm(nom,prenom,email,mdp)) {
      this.setState({
        error: true
      })
    }
    
    else {
      this.setState({
        error:false
      })
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


    if (!email) {
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
        }}
        />
    </div>
    );
  };

}
export default NavBar;
