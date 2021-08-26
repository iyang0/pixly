function ImageCard({image}){
  return (<div><img src={image.path} alt={image.name}/></div>)
}

export default ImageCard;