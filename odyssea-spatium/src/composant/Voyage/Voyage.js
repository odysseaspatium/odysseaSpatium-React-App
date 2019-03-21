import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import ImageGallery from 'react-image-gallery';
import {withRouter} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import './Voyage.css';
import * as Parametres from '../../Param';
import axios from 'axios';


class Voyage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state)
    
    this.state = {
      history:this.props.history,
      id_Voyage:this.props.location.state.image.id_voyage,
      image_annonce:this.props.location.state.image.lien_photo_annonce,
      images_voyages:this.props.location.state.image.lien_photos_voyage,
      annonce:this.props.location.state.image.annonce_voyage,
      dateDebut:this.props.location.state.image.dateDebut_voyage,
      dateFin:this.props.location.state.image.dateFin_voyage,
      Utilisateur:JSON.parse(sessionStorage.getItem("utilisateur")),
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
      prix: this.props.location.state.image.prix_voyage,
      descriptionVoyage:this.props.location.state.image.description_voyage,
      id_panier:null,
      images_commentaire:null,
    };
    this.image=[];
    console.log(this.state)
}
  componentWillMount(){
    for(let index=0;index<this.state.images_voyages.length;index++){
      this.image.push({ 
        original:this.state.images_voyages[index],
        originalClass: 'featured-slide',
      })
    }
    if(this.state.Utilisateur !=null){
      axios({
        url: Parametres.URL_TOMCAT+'/Bridge',
        method: 'post',
        data: {
          id_utilisateur : this.state.Utilisateur.id,
          route: 'Panier/idPanier',
        }
      }).then(res => {
        if (res.data !== ""){
          console.log(res);
          this.setState({id_panier:res.data[0].id_panier_user});
        }
      });
    } 
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
          data.push(<p>{res.data[index].texte_commentaire}</p>);
          try{
            data.push(<img src={res.data[index].lien_photos_commentaire}></img>);
          }catch(e){}
          data.push(<><br/><hr/></>);
        }
        this.setState({Commentaires:data});
      }
    });
  }
  componentDidMount(){
    var aujourdhui = new Date().getDate();
    if(aujourdhui<=this.state.dateFin){
      document.getElementById("tab_ajout_commentaire").style.display="none";
    }else{
      document.getElementById("tab_ajout_commentaire").style.display="block";
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      this._imageGallery.pause();
      this._imageGallery.play();
    }
    
  }
  handleFile(e){
    let file= e.target.files;
    this.setState({images_commentaire:file});
  }
  uploadCommentaire(){
    if(this.state.Utilisateur !=null){
      let imagesCommentaire =this.state.images_commentaire;
      let formadata = new FormData();
      formadata.append('image',imagesCommentaire);
      axios({
        url: Parametres.URL_TOMCAT+'/Bridge',
        method: 'post',
        data: {
          id_voyage: this.state.id_Voyage,
          commentaire: document.getElementById("commentaire").value,
          id_utilisateur : this.state.Utilisateur.id,
          route:'Commentaire/addCommentaire',
          images:formadata,
        }
      }).then(res => {
        if (res.data !== ""){
          console.log(res);
          document.getElementById("Ajouter_Commentaire_retour").innerHTML="Sucess";
        }
        document.getElementById("Ajouter_Commentaire_retour").innerHTML="Echec";
      });
    }
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
        id_Voyage:this.state.id_Voyage,
        id_panier:this.state.id_panier,
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
    
      const loggedIn=this.state.Utilisateur;
      return (
        <div>
          <table className="description-achat-voyage">
          <tbody>
            <tr>
              <td colSpan="3">
                <Parallax bgImage={this.state.image_annonce} strength={500} >
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
                    items={this.image}
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
                <p>Debut: <DatePicker className="datepick" selected={this.state.dateDebut} readOnly={true} locale={fr}/></p>
                <p>Fin prevue:<DatePicker  className="datepick" selected={this.state.dateFin} readOnly={true} locale={fr}/></p>
                <p>{this.state.descriptionVoyage}</p>
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
            <table className="description-achat-voyage" id="tab_ajout_commentaire">
            {loggedIn ? (
                <tbody>
                <tr>
                  <td>
                    <p>Ajout commentaire: <button id="Ajouter_Commentaire" type="submit" onClick={this.uploadCommentaire.bind(this)}>Ajouter Commentaire</button></p>
                    <p id="Ajouter_Commentaire_retour"></p>
                    <textarea id="commentaire" name="commentaire" rows="5" cols="55"></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p> Ajout images a votre commentaire:</p>
                    <input type="file" multiple id="Ajout_image" name="Ajout_image" accept="image/png, image/jpeg" onChange={(e)=>this.handleFile(e)}></input>
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