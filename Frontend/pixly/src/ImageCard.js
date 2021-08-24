function ImageCard({image}){
  console.log(image)
  return (<div><img src={image.url} alt={image.name}/></div>)
}

export default ImageCard;