import React,{Component} from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    margin:'auto'
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

})

class Search extends Component {

  state = {
    images: [],
    nxtPage: 1,
    inputSearch: '',
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }


  handleChange = name => event => {
    this.setState({ [name]: event.target.value, nxtPage: 1, images: [] }, () => this.searchedImages());
  };

  searchedImages = () => {
    fetch(`https://api.unsplash.com/search/photos?client_id=26f624f991e1054bc081c2418f43e12040b36c2db0174ad1c49efd83d98a9a22&$&page=${this.state.nxtSearchedPage}&query=${this.state.inputSearch}&per_page=20`)
      .then(res => res.json())
      .then(images => {
        // console.log(images.results)
        console.log('state', ...this.state.images)
        this.setState({images: [ ...this.state.images, ...images.results]})
      })
      console.log(this.state.inputSearch)
  }

  nxtPage = () => {
    this.setState({nxtPage: this.state.nxtPage + 1}, () => this.searchedImages())
  }

  handleScroll = () => {
    console.log('scroll');
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight)
    {
      this.nxtPage()
    }
  }


  render() {
    const {classes} = this.props
    return (
      <>
      <div style={{margin:10}}>
        <Paper className={classes.paper} elevation={1}>
          <InputBase
            id="search"
            placeholder='Buscar imagenes'
            value={this.state.inputSearch}
            onChange={this.handleChange('inputSearch')}
            className={classes.input}
          />
          <IconButton className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div>
        {
          (this.state.images !== null) ?
          (
            <GridList cellHeight={300}  cols={4}>
              {this.state.images.map(img => (
                <GridListTile key={img.id} cols={1}>
                  <img src={img.urls.small} alt={img.alt_description} />
                  <GridListTileBar
                    title={img.alt_description}
                    subtitle={<span>by: {img.user.name}</span>}
                    actionIcon={
                      <Icon className={classNames(classes.iconHover, "fas fa-heart")} style={{ marginRight: 10 }} onClick={(event) => this.likeImage(event, img)} />
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          )

          : 'loadiing...'
        }
        <div style={{ width:'100%', height: 50 }}></div>
      </div>
      </>
    )
  }


}

export default withStyles(styles)(Search)
