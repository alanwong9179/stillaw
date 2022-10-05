import React , { useState, useEffect }from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSpring, animated } from "react-spring";

export default function ImageContainer({src}) {
  const AniImage = animated(LazyLoadImage)
  const [selected, setSelected] = useState(false)

  const [zoom, onZoom] = useSpring(() => ({
    marginLeft: '50%',
    marginRight: '50%',
}))

useEffect(() => {
    console.log(selected)
    onZoom.start({
        marginLeft: selected? '50%': '0%' ,
        marginRight:selected? '50%': '0%' ,
    })
}, [selected])

 

  return (
    <AniImage
    onClick={()=>{setSelected(!selected)}}
    style={{ ...zoom }} 
    effect="blur"
    height={'100%'}
    width={'100%'}
    src={[src]} />
  )
}
