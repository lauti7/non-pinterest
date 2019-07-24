import React, {Component} from 'react'
import auth from '../auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridList from '@material-ui/core/GridList';
import ImagesLayout from './ImagesLayout'


class Home extends Component {

  state = {
    images: [],
    nxtPage: 1,
  }


  componentDidMount(){
    this.images();
    toast.configure({
      autoClose: 2000,
      draggable: true,
    })
    window.addEventListener('scroll', this.handleScroll);
  }

  images = () => {
    fetch(`https://api.unsplash.com/photos/?client_id=26f624f991e1054bc081c2418f43e12040b36c2db0174ad1c49efd83d98a9a22&page=${this.state.nxtPage}&per_page=20`)
      .then(res => res.json())
      .then(images => this.setState({images: [...this.state.images, ...images]}, () => console.log(...images)))
  }

  nxtPage = () => {
    this.setState({nxtPage: this.state.nxtPage + 1}, () => this.images())
  }

  likeImage = (event, img) => {
    console.log('like');
    event.target.classList.remove('Home-iconHover-111');
    event.target.classList.add('iconLike');
    event.target.classList.add('liked');
    if (auth.isAuthenticated()) {
      const requestData = {
        url: img,
        userId: auth.user.uid
      }
      fetch('http://localhost:8080/api/likes', {
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
          toast('Like', {
            position: toast.POSITION.TOP_CENTER
          })
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

  render() {
    return(
    <>
      <h1>Home</h1>
      <h2>Imagenes populares</h2>
      <div>
      {
        (this.state.images.length !== 0) ?
          (
            <GridList>
              {this.state.images.map(img => (
                <ImagesLayout
                  full={img.urls.full}
                  key={img.id}
                  source={img.urls.small}
                  alt_description={img.alt_description}
                  user={img.user.name}
                  likeImage={this.likeImage}
                />
              ))}
            </GridList>
          )
        : 'loading'
      }
      </div>

      <div style={{height: 25}}></div>
    </>
    )
  }
}

export default Home
