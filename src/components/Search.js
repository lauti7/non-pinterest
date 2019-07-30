import React,{Component} from 'react'
import auth from '../auth';
import { toast } from 'react-toastify';
import InputSearch from './InputSearch'
import ImagesContainer from './ImagesContainer'

class Search extends Component {

  state = {
    images: [],
    nxtPage: 1,
    inputSearch: '',
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleChange = event => {
    this.setState({ inputSearch: event.target.value, nxtPage: 1, images: [] }, () => this.searchedImages());
  };

  searchedImages = () => {
    fetch(`https://api.unsplash.com/search/photos?client_id=26f624f991e1054bc081c2418f43e12040b36c2db0174ad1c49efd83d98a9a22&$&page=${this.state.nxtPage}&query=${this.state.inputSearch}&per_page=20`)
      .then(res => res.json())
      .then(images => images.results.map(img => {
        return {
          id: img.id,
          url: img.urls.small,
          alt_description: img.alt_description,
          urlFull: img.urls.full,
          user: img.user.name
        }
      }))
      .then(newImages => {
        this.setState({images: [ ...this.state.images, ...newImages]})
      })
  }

  nxtPage = () => {
    this.setState({nxtPage: this.state.nxtPage + 1}, () => this.searchedImages())
  }

  likeImage = (event, img) => {
    // event.target.classList.remove('Home-iconHover-111');
    // event.target.classList.add('iconLike');
    // event.target.classList.add('liked');
    if (auth.isAuthenticated()) {
      const requestData = {
        url: img.url,
        urlFull:img.urlFull,
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
          toast('Liked', {
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
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
    {
      this.nxtPage()
    }
  }


  render() {
    return (
      <>
      <InputSearch
        handleChange={this.handleChange}
        inputSearch={this.state.inputSearch}
      />
      <div>
        <ImagesContainer
          images={this.state.images}
          history={this.props.history}
          likeImage={this.likeImage}
        />
        <div style={{ width:'100%', height: '50px' }}></div>
      </div>
      </>
    )
  }


}

export default Search
