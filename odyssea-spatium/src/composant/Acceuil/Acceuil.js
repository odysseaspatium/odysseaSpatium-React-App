import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './Acceuil.css';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import * as Parametres from '../../Param';

class Acceuil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history,
      showIndex: true,
      showBullets: true,
      infinite: true,
      showThumbnails: false,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      Utilisateur:JSON.parse(sessionStorage.getItem("utilisateur")),
      showNav: false,
      isRTL: false,
      slideDuration: Parametres.DUREE_SLIDE,
      slideInterval: Parametres.INTERVAL_SLIDE,
      showVideo: {},
      showMore:null,
      voyages:null,
    };
    this.images = [];
     
  }
  componentWillMount(){
    axios({
      url: Parametres.URL_TOMCAT+'/Bridge',
      method: 'post',
      data: {
        route: 'Voyage/getTousVoyages'
      }
    }).then(res => {
      if (res.data !== ""){
        for(let index=0; index<res.data.length;index++){
          this.setState({voyages:res.data});
          this.images.push({
            id:res.data[index].id_voyage,
            original:res.data[index].lien_photo_annonce[0],
            originalClass: 'featured-slide',
            description:res.data[index].annonce_voyage,
            onclick:this._redirect
          });
        }  
        console.log(this.images);
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
  _redirect(){
    let index = this._imageGallery.getCurrentIndex();
    this.state.history.push({
      pathname: Parametres.PREFIX_URL+'/voyage',
      state :{
        image:this.state.voyages[index],
        }
      }
    );
  }
  _renderCustomControls() {
    return <button className='image-gallery-custom' type="button"  aria-label="Open Info" onClickCapture={this._redirect.bind(this)}></button>
  }
  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }


    render() {
     
      return (
        <div className='pub'>
          <section >
          <ImageGallery
            ref={i => this._imageGallery = i}
            items={this.images}
            autoPlay={true}
            lazyLoad={false}
            onClick={this._redirect.bind(this)}
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
            renderCustomControls={this._renderCustomControls.bind(this)}
          />
          </section>
        </div>

      );
    }
  }
  
  export default withRouter(Acceuil);
  