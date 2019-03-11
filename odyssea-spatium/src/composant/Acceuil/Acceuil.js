import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import './Acceuil.css';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
const PREFIX_URL = '';

class Acceuil extends Component {
  constructor() {
    super();
    this.state = {
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
      slideInterval: 2000,
      showVideo: {},
      showMore:null,
    };
    this.images = [
      {
        original: `${PREFIX_URL}saturn.jpg`,
        originalClass: 'featured-slide',
        description: 'Voyage pour saturne une oportunité a ne pas louper'
      },
      {
        original: `${PREFIX_URL}kepler-452b.jpg`,
        originalClass: 'featured-slide',
        description: 'Le nouvel eldorado kepler-452b, 100 premiers vols a 50%'
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
  _redirect(event){
    return null;
  }
  _renderCustomControls() {
    return <button className='image-gallery-fullscreen-button image-gallery-custom' />
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
            renderCustomControls={this._renderCustomControls}
          />
          </section>
        </div>

      );
    }
  }
  
  export default Acceuil;
  