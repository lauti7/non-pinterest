import React, { Component } from 'react'
import auth from '../auth';
import ImagesContainer from './ImagesContainer'

class Profile extends Component {

  state = {
    userImages: []
  }

  userImages = () => {
    fetch(`http://localhost:8080/api/likes/${auth.user.uid}`)
      .then(res => res.json())
      .then(userImages => {
        this.setState({userImages:[...userImages.response]}, () => console.log(this.state.userImages))
      })
  }

  componentDidMount() {
    this.userImages()
  }

  unlikeImage = (event, img) => {
    console.log('unlike');
    const requestData = {
      url: img.url,
      urlFull: img.urlFull,
      userId: img.userId
    }
    fetch('http://localhost:8080/api/likes', {
      method: 'DELETE',
      body: JSON.stringify(requestData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(() => this.userImages())
  }

  random = () => {
    let random = Math.floor(Math.random()*3);

    if (random === 0) {
      random = 1
    }
    console.log(random);
    return random;
  }



  render() {
    return (
      <>
        <h1> Mi Perfil </h1>
        <h2>Mis fotos</h2>
        <ImagesContainer
          images={this.state.userImages}
          history={this.props.history}
          likeImage={this.unlikeImage}
         />
      </>

    );
  }
}


export default Profile;
