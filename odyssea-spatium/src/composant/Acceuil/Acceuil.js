import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import {withRouter} from 'react-router-dom';
import './Acceuil.css';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
const PREFIX_URL = '';

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
      showNav: false,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 4500,
      showVideo: {},
      showMore:null,
    };
    this.images = [
      {
        id:1,
        original: `${PREFIX_URL}saturn.jpg`,
        originalClass: 'featured-slide',
        description: 'Voyage pour saturne une opportunité a ne pas louper',
        onclick:this._redirect
      },
      {
        id:2,
        original: `${PREFIX_URL}kepler-452b.jpg`,
        originalClass: 'featured-slide',
        description: 'Le nouvel eldorado kepler-452b, 100 premiers vols a 50%',
        onclick:this._redirect
      },
      {
        id:3,
        original: `${PREFIX_URL}exoplanet.jpg`,
        originalClass: 'featured-slide',
        description: 'Planete BRZ, Partez pour bronzer !',
        onclick:this._redirect
      }
    ]
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
    let id_Voyage_Courant = this.images[index].id;
    this.state.history.push({
      pathname: '/voyage',
      state :{id_Voyage:id_Voyage_Courant}
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
        <div>
          <section className='images'>
          <ImageGallery
            ref={i => this._imageGallery = i}
            items={this.images}
            lazyLoad={false}
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
  