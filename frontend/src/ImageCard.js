
function ImageCard({image}) {
  return (
  <div className="card p-1">
    <p className="card-header">{image.name}</p>
    <img className="img-fluid" src={image.path} alt={image.name}/>
  </div>)
}

export default ImageCard;