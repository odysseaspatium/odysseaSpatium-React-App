import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import ImageGallery from 'react-image-gallery';
import {withRouter} from 'react-router-dom';
import './Voyage.css';
import { isNullOrUndefined } from 'util';
import * as Parametres from '../../Param';
import axios from 'axios';


class Voyage extends Component {
  constructor(props) {
    super(props);
    let visiteur=null;
    if(!isNullOrUndefined(this.props.state)){
      visiteur = this.props.state.utilisateur;
    }
    
    this.state = {
      history:this.props.history,
      id:this.props.location.state.image.id,
      image:this.props.location.state.image.original,
      annonce:this.props.location.state.image.description,
      id_Utilisateur:visiteur.id,
      showIndex: true,
      showBullets: true,
      infinite: true,
      showThumbnails: false,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: false,
      isRTL: false,
      slideDuration: Parametres.DUREE_SLIDE,
      slideInterval: Parametres.INTERVAL_SLIDE,
      showVideo: {},
      showMore:null,
      Commentaires:null,
      prix: null,
      descriptionVoyage:null,
      id_panier:null,
    };
   
    this.images = []
}
  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_utilisateur : this.state.id_Utilisateur,
        route: 'Panier/idPanier',
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        this.setState({id_panier:res.data[0].id_panier});
      }
    });
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_voyage: this.state.id_Voyage,
        route:'Voyage/getVoyage',
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        for(let index=0; index<res.data.length;index++){
          this.images[index].push({
            original: `${Parametres.PREFIX_URL}${res.data[index].lien_photos_voyage}`,
            originalClass: 'featured-slide',
          });
        }
        this.setState({descriptionVoyage:res.data[0].description_voyage});
        this.setState({prix:res.data[0].prix_voyage});
      }
    });
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_voyage: this.state.id_Voyage,
        route:'Commentaire/getCommentaire'
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        let data=[];
        for(let index=0; index<res.data.length;index++){
          data.push("<p>"+res.data[index].texte_commentaire+"</p>");
          try{
            data.push("<img src='"+res.data[index].lien_photos_commentaire+"'></img>");
          }catch(e){}
          data.push("<hr/>");
        }
        this.setState({Commentaires:data});
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      this._imageGallery.pause();
      this._imageGallery.play();
    }
    
  }
  uploadImage(){}
  uploadCommentaire(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_voyage: this.state.id_Voyage,
        id_utilisateur : this.state.id_Utilisateur,
        commentaire: document.getElementById("commentaire").value,
        route:'Commentaire/addCommentaire',
      }
    }).then(res => {
      if (res.data !== ""){
        console.log(res);
        document.getElementById("Ajouter_Commentaire_retour").innerHTML="Sucess";
      }
      document.getElementById("Ajouter_Commentaire_retour").innerHTML="Echec";
    });
  }
  _redirect(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        id_panier : this.state.id_panier,
        id_voyage: this.state.id_Voyage,
        route:'Article/ajoutVoyage'
      }
    });
    this.state.history.push({
      pathname: Parametres.PREFIX_URL+'/panier',
      state :{
        id_Utilisateur:this.id_Utilisateur,
        id_Voyage:this.id_Voyage,
        prix:this.state.prix,
        }
      }
    );
  }
  
  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

    render() {
    
      const loggedIn=this.state.id_Utilisateur;
      return (
        <div>
          <table className="description-achat-voyage">
          <tbody>
            <tr>
              <td colSpan="3">
                <Parallax bgImage={this.state.image} strength={500} >
                  <div style={{ height: '400px' }}>
                    <div className='insideStyles'>{this.state.annonce}</div>
                  </div>
                </Parallax>
              </td>
            </tr>
            <tr>
              <td  className='Contenant-images'>
                <section>
                  <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={this.images}
                    lazyLoad={false}
                    autoPlay={true}
                    infinite={this.state.infinite}
                    showBullets={this.state.showBullets}
                    showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
                    showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
                    showIndex={this.state.showIndex}
                    showNav={this.state.showNav}
                    isRTL={this.state.isRTL}
                    slideDuration={parseInt(this.state.slideDuration)}
                    slideInterval={parseInt(this.state.slideInterval)}
                    additionalClass="app-image-gallery"
                  />
                </section>
              </td>
              <td>
               {this.state.descriptionVoyage}
              </td>
              <td className="contenant-prix">
                <div>
                  prix :{this.state.prix}
                </div>
                {loggedIn ? (
                  <div className='contenant-cadis'>
                    <button className='image-cadis' type="button"  aria-label="Ajout cadis" onClickCapture={this._redirect.bind(this)}></button>
                  </div>
                ) :(null)}
              </td>
            </tr>
            </tbody>
            </table>
            <br/>
            <hr/>
            <br/>
            <table className="description-achat-voyage">
            {loggedIn ? (
                <tbody>
                <tr>
                  <td>
                    <p>Ajout commentaire: <button id="Ajouter_Commentaire" type="submit" value="Ajouter" onClick={this.uploadCommentaire}></button></p>
                    <p id="Ajouter_Commentaire_retour"></p>
                    <textarea id="commentaire" name="commentaire" rows="5" cols="55"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p> Ajout images a votre commentaire:</p>
                    <input type="file" id="Ajout_image" name="Ajout_image" accept="image/png, image/jpeg"></input>
                  </td>
                </tr>
                </tbody>
              ) : (
                null
              )}
            </table>
            <br/>
            <hr/>
            <br/>
            <div>
              <p>
                Commentaires:
              </p>
              <div>
              {this.state.Commentaires}
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default withRouter(Voyage);