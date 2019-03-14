import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import ImageGallery from 'react-image-gallery';
import {withRouter} from 'react-router-dom';
import './Voyage.css';
import { isNullOrUndefined } from 'util';
import * as Parametres from '../../Param';

let image=null;

class Voyage extends Component {
  constructor(props) {
    super(props);
    let visiteur=null;
    if(!isNullOrUndefined(this.props.state)){
      visiteur = this.props.state.id_Utilisateur;
    }
    
    this.state = {
      history:this.props.history,
      id:this.props.location.state.id_Voyage,
      id_Utilisateur:visiteur,
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
      description:"",
    };
   
    this.images = [
      {
        original: `${Parametres.PREFIX_URL}sat_ceinture.jpg`,
        originalClass: 'featured-slide'
      },
      {
        original: `${Parametres.PREFIX_URL}sat_proche.jpg`,
        originalClass: 'featured-slide'
      },
      {
        original: `${Parametres.PREFIX_URL}sat_rose.jpg`,
        originalClass: 'featured-slide',
        description: 'Soirée rose'
      }
    ]
  }
  componentDidMount(){
    switch(this.state.id){
      case 1: 
        image =`${Parametres.PREFIX_URL}saturn.jpg`;
        this.setState({description:'Voyage pour saturne une opportunité a ne pas louper'});
        break;
      case 2:
        image =`${Parametres.PREFIX_URL}kepler-452b.jpg`;
        this.setState({description:'Le nouvel eldorado kepler-452b, 100 premiers vols a 50%'});
        break;

      case 3:
        image =`${Parametres.PREFIX_URL}exoplanet.jpg`;
        this.setState({description:'Planete BRZ, Partez pour bronzer !'});
        break;

      default:
        break;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      this._imageGallery.pause();
      this._imageGallery.play();
    }
    
  }
  _redirect(){
    this.state.history.push({
      pathname: '/agenceVoyageTomcat/panier',
      state :{
        id_Utilisateur:this.id_Utilisateur,
        id_Voyage:this.id
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
    
      return (
        <div>
          <table className="description-achat-voyage">
          <tbody>
            <tr>
              <td colSpan="3">
                <Parallax bgImage={image} strength={500} >
                  <div style={{ height: '400px' }}>
                    <div className='insideStyles'>{this.state.description}</div>
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
                Bla Bla description
                <br/>
                Bla
                <br/>
                Bla
                <br/>
                Bla
                <br/>
                Bla
              </td>
              <td className="contenant-prix">
                <div>
                  Bla Bla prix :
                </div>
                <div className='contenant-cadis'>
                  <button className='image-cadis' type="button"  aria-label="Ajout cadis" onClickCapture={this._redirect.bind(this)}></button>
                </div>
              </td>
            </tr>
            </tbody>
            </table>
            <br/>
            <hr/>
            <br/>
            <table className="description-achat-voyage">
            <tbody>
            <tr>
              <td>
                <form method="POST">
                Ajout images:
                  <input type="file" id="Ajout_image" name="Ajout_image" accept="image/png, image/jpeg"></input>
                  <input id="Ajouter_image" type="submit" value="Ajouter"></input>
                </form>
              </td>
            </tr>
            <tr>
              <td>
                <form method="POST">
                <p>Ajout commentaire: <input id="Ajouter_Commentaire" type="submit" value="Ajouter"></input></p>
                <textarea id="commentaires" name="commentaires" rows="5" cols="55"></textarea>
                </form>
              </td>
            </tr>
            </tbody>
            </table>
            <br/>
            <hr/>
            <br/>
            <div>
              <p>
                Commentaires:
              </p>
              <div>
                bla <br/>
                bla <br/>
                bla <br/>
                bla <br/>
              </div>
            </div>
        </div>
      );
    }
  }
  
  export default withRouter(Voyage);