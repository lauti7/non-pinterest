import React from 'react'
import GridListTile from '@material-ui/core/GridListTile';
import LikeBanner from './LikeBanner'

const ImagesLayout = (props) => {
  return (
    //Le meti el style porque sin el grid list no toma los estilos
    <>
      <GridListTile style={{width: '20%', height: '265px', padding: '2px',}} cols={1}>
        <a target="_blank" href={props.full} title="Ver imagen completa">
          <img style={{width: '100%', height: '100%'}} src={props.source} alt={props.alt_description}/>
        </a>
        <LikeBanner
          alt_description={props.alt_description}
          user={props.user}
          source={props.source}
          likeImage={props.likeImage}
         />
      </GridListTile>
    </>
  )
}


export default ImagesLayout
