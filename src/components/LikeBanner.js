import React from 'react'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Favorite} from '@material-ui/icons'


const styles = theme => ({
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    color: 'rgb(255, 255, 255)',
    '&:hover': {
      color: 'rgb(255, 0, 0)',
    },
  },
  liked: {
    color:'rgb(255, 0, 0)'
  }
});

const LikeBanner = (props) => {
  const {classes} = props
  return (
    <>
    <GridListTileBar
      title={props.alt_description}
      subtitle={<span>{props.user}</span>}
      actionIcon={
        <Favorite className={(props.pathname === '/profile') ? classNames(classes.iconHover, classes.liked) : classNames(classes.iconHover, classes.icon)} onClick={(event) => props.likeImage(event, props.img)} />
      }
    />
    </>
  )
}

export default withStyles(styles)(LikeBanner)
