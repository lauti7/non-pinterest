import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LikeBanner from './LikeBanner';

const ImagesContainer = ({images, likeImage, history}) => {
  return (
    <div>
    {
      (images.length !== 0) ?
        (
          <GridList cellHeight={260} cols={4}>
            {images.map(img => (
              <GridListTile key={img.id} cols={1}>
                <a target="_blank"  rel="noopener noreferrer" href={img.urlFull} title="Ver imagen completa">
                  <img
                    style={{width:'100%', height:'100%'}}
                    src={img.url}
                    alt={(history.location.pathname === '/profile') ? 'Una imagen likeada' : img.alt_description}/>
                </a>
                <LikeBanner
                  alt_description={(history.location.pathname === '/profile') ? 'Una imagen likeada' : img.alt_description}
                  user={(history.location.pathname === '/profile') ? '' : `by ${img.user}`}
                  img={img}
                  pathname={history.location.pathname}
                  likeImage={likeImage}
                 />
              </GridListTile>
            ))}
          </GridList>
        )
      : 'Loading...'
    }
    </div>
  )
}

export default ImagesContainer
