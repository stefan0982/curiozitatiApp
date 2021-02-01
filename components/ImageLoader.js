import React from 'react'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

const ImageLoader = () => {
  return (
    <Image
      source={{ uri: 'http://loremflickr.com/640/480/dog' }}
      indicator={ProgressBar.Pie}
      indicatorProps={{
        size: 80,
        borderWidth: 0,
        color: 'rgba(150, 150, 150, 1)',
        unfilledColor: 'rgba(200, 200, 200, 0.2)'
      }}
      style={{
        width: 320,
        height: 240,
      }}/>
  )
}

export default ImageLoader
