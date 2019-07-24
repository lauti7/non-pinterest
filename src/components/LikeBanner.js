import React from 'react'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

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
});

const LikeBanner = (props) => {
  const {classes} = props
  return (
    <>
    <GridListTileBar
      title={props.alt_description}
      subtitle={<span>by: {props.user}</span>}
      actionIcon={
        <Icon className={classNames(classes.iconHover, "fas fa-heart")} style={{ marginRight: 10 }} onClick={(event) => props.likeImage(event, props.source)} />
      }
    />
    </>
  )
}

export default withStyles(styles)(LikeBanner)
