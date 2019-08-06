import React from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LikeBanner from './LikeBanner';
import withWidth from '@material-ui/core/withWidth';

const ImagesContainer = ({images, likeImage, history, likedImages, width}) => {
  const likedImgs =  likedImages();



  const checkWidth = () => {
    if (width === 'xs') {
      return 1
    } else  if (width === 'sm') {
      return 2
    } else if (width === 'md' || width === 'lg'){
      return 4
    }
  }


  return (
    <div>
    {
      (images.length !== 0) ?
        (
          <GridList cellHeight={260} cols={checkWidth()}>
            {images.map(img => (
              <GridListTile  key={img.id} cols={1}>
                <img
                  src={img.url}
                  alt={(history.location.pathname === '/profile') ? 'Una imagen likeada' : img.alt_description}/>
                <LikeBanner
                  alt_description={(history.location.pathname === '/profile') ? '' : img.alt_description}
                  user={(history.location.pathname === '/profile') ? '' : `by ${img.user}`}
                  img={img}
                  pathname={history.location.pathname}
                  likeImage={likeImage}
                  liked={(!likedImgs) ? null : likedImgs.find(r => r === img.url) }
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

export default withWidth()(ImagesContainer)
