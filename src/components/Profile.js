import React, { Component } from 'react'
import auth from '../auth';
import { toast } from 'react-toastify';
import ImagesContainer from './ImagesContainer'

class Profile extends Component {

  state = {
    userImages: []
  }

  userImages = () => {
    fetch(`https://non-pinterest.herokuapp.com/api/likes/${auth.user.uid}`)
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
    fetch('https://non-pinterest.herokuapp.com/api/likes', {
      method: 'DELETE',
      body: JSON.stringify(requestData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      toast('Unliked', {
        position: toast.POSITION.TOP_CENTER
      })
      this.userImages()
    })

  }



  render() {
    return (
      <>
        <h1> Mi Perfil </h1>
        <h2>Mis likes</h2>
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
