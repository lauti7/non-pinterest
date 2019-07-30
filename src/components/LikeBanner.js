import React from 'react'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import {Favorite} from '@material-ui/icons'
import ModalImage from './ModalImage'


const styles = theme => ({
  iconHover: {
    color: 'rgb(255, 255, 255)',
    '&:hover': {
      color: 'rgb(255, 0, 0)',
    },
  },
  liked: {
    color:'rgb(255, 0, 0)',
  },
  titleBar:{
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  fullImage: {
    color: 'rgb(255, 255, 255)',
    '&:hover': {
      color: 'rgb(61, 236, 94)',
    },
  }
});

const LikeBanner = (props) => {
  const {classes} = props



  return (
    <>
    <GridListTileBar
      title={<p style={{ maxWidth: '10px', margin: 0}} title={props.alt_description} >{props.alt_description}</p>}
      subtitle={<span >{props.user}</span>}
      actionIcon={
        <>
          <IconButton style={{padding: '0px'}} onClick={(event) => props.likeImage(event, props.img)}>
            <Favorite className={(props.liked || props.pathname === '/profile') ?  classes.liked : classes.iconHover}  />
          </IconButton>
          <ModalImage img={props.img.urlFull} />
        </>
      }
      className={classes.titleBar}
    />


    </>
  )
}

export default withStyles(styles)(LikeBanner)
