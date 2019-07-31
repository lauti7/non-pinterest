import React, {Component} from 'react'
import auth from '../auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagesContainer from './ImagesContainer'

class Home extends Component {

  state = {
    images: [],
    nxtPage: 1,
    userImages: [],
    likedImages: null
  }


  componentDidMount(){
    this.userImages()
    this.images()
    toast.configure({
      autoClose: 2000,
      draggable: true,
    })
    window.addEventListener('scroll', this.handleScroll);
  }

  images = () => {
    fetch(`https://api.unsplash.com/photos/?client_id=26f624f991e1054bc081c2418f43e12040b36c2db0174ad1c49efd83d98a9a22&page=${this.state.nxtPage}&per_page=20`)
      .then(res => res.json())
      .then(images => images.map(img => {
        return {
          id: img.id,
          url: img.urls.small,
          alt_description: img.alt_description,
          urlFull: img.urls.regular,
          user: img.user.name
        }
      }))
      .then(newImages => this.setState({images: [...this.state.images, ...newImages]}))
  }

  userImages = () => {
    fetch(`http://non-pinterest.herokuapp.com/api/likes/${auth.user.uid}`)
      .then(res => res.json())
      .then(userImages => {
        this.setState({userImages:[...userImages.response]})
      })
  }

  nxtPage = () => {
    this.setState({nxtPage: this.state.nxtPage + 1}, () => this.images())
  }

  likeImage = (event, img) => {
    console.log('like');
    event.target.classList.add('iconLike');
    event.target.classList.add('liked');
    if (auth.isAuthenticated()) {
      const requestData = {
        url: img.url,
        urlFull:img.urlFull,
        userId: auth.user.uid
      }
      fetch('http://non-pinterest.herokuapp.com/api/likes', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(like => {
        console.log(like);
        if (like === false) {
          toast.error('Ya le diste Like a esta imagen');
        } else {
          toast('Liked', {
            position: toast.POSITION.TOP_CENTER
          })
          this.userImages()
          this.findLikedImages()
        }

      })
    } else {
      toast.error('Registrate o entra a tu cuenta para dar like a una imagen',{
        position: toast.POSITION.TOP_CENTER
      });
      this.props.history.push('/login')
    }
  }

  handleScroll = () => {
    console.log('scroll');
    console.log('innerHeight', window.innerHeight);
    console.log('scrrolltop', document.documentElement.scrollTop);
    console.log('offsetHeight', document.documentElement.offsetHeight);

    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
    {
      console.log('bottom');

      this.nxtPage();
    }
  }

  findLikedImages = () => {
    if(this.state.images.length > 0){
      const likedImages = [...this.state.userImages]
      const images = [...this.state.images]
      const urlsLikedImages = likedImages.map(img => img.url)
      const urlsImages = images.map(img => img.url)
      const filter = urlsImages.filter(img => urlsLikedImages.includes(img))
      return filter
    } else {
      return false
    }
  }

  render() {
    return(
    <>
      <h1>Imagenes populares</h1>
      <ImagesContainer
        images={this.state.images}
        history={this.props.history}
        likeImage={this.likeImage}
        likedImages={this.findLikedImages}
      />
      <div style={{height: 25}}></div>
    </>
    )
  }
}

export default Home
