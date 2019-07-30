import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LikeBanner from './LikeBanner';

const ImagesContainer = ({images, likeImage, history, likedImages}) => {
  const likedImgs = (history.location.pathname === '/profile') ? null : likedImages()
  return (
    <div>
    {
      (images.length !== 0) ?
        (
          <GridList cellHeight={260} cols={4}>
            {images.map(img => (
              <GridListTile key={img.id} cols={1}>
                <img
                  src={img.url}
                  alt={(history.location.pathname === '/profile') ? 'Una imagen likeada' : img.alt_description}/>
                <LikeBanner
                  alt_description={(history.location.pathname === '/profile') ? '' : img.alt_description}
                  user={(history.location.pathname === '/profile') ? '' : `by ${img.user}`}
                  img={img}
                  pathname={history.location.pathname}
                  likeImage={likeImage}
                  liked={(likedImgs !== null) ? likedImgs.find(r => r === img.url) : null}
                 />
              </GridListTile>
            ))}
          </GridList>
        )
      : ((history.location.pathname === '/search') ? '' : 'Loading')
    }
    </div>
  )
}

export default ImagesContainer
