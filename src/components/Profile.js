import React, { Component } from 'react'
import auth from '../auth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import Test from './Test'

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
    // <Test
    //   source={img.url}
    //   id={img.id}
    //   unlikeImage={this.unlikeImage}
    //  />
    //  <img src={img.url} alt="" />
    // <GridListTileBar
    //   title={img.id}
    //   actionIcon={
    //     <Icon className="fas fa-heart" color="error" style={{ marginRight: 10 }} onClick={(event) => this.unlikeImage(event,  img.url)} />}
    //  />
    return (
      <>
        <h1> Mi Perfil </h1>
        <h2>Mis fotos</h2>
        {
          (this.state.userImages !== null) ?
          (
            <GridList cellHeight={260}  cols={5}>
              {this.state.userImages.map(img => (
                <GridListTile key={img.id} cols={this.random()}>
                  <Test
                    source={img.url}
                    id={img.id}
                    unlikeImage={this.unlikeImage}
                   />
                </GridListTile>
              ))}
            </GridList>
          )
          : 'loadiing...'
        }
      </>

    );
  }
}


export default Profile;
