import React from 'react'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';


const Test = (props) => {
  return (
    <>
      <img src={props.source} alt="" />
      <GridListTileBar
        title={props.id}
        actionIcon={
          <Icon className="fas fa-heart" color="error" style={{ marginRight: 10 }} onClick={(event) => props.unlikeImage(event, props.source)} />}
       />
    </>
  )
}

export default Test
