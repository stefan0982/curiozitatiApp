import React                           from 'react'
import ContentLoader, { Circle, Rect } from 'react-content-loader/native'
import { Dimensions }                  from 'react-native'

const SkeletonLoading = () => {
  return <ContentLoader
    speed={ 0.5 }
    width={ Dimensions.get( 'window' ).width }
    height={ 460 }
    viewBox="0 0 400 460"
    backgroundColor="#d9d9d9"
    foregroundColor="#b9baa7"
  >
    <Circle
      cx="31"
      cy="31"
      r="15"
    />
    <Rect
      x="58"
      y="18"
      rx="2"
      ry="2"
      width="140"
      height="10"
    />
    <Rect
      x="58"
      y="34"
      rx="2"
      ry="2"
      width="140"
      height="10"
    />
    <Rect
      x="0"
      y="60"
      rx="2"
      ry="2"
      width="400"
      height="400"
    />
  </ContentLoader>
}

export default SkeletonLoading
