
function ImageCard({image, children}) {
  // let title=image.name.slice(0, 30);
  return (
  <div className="card p-1 mb-2">
    <p className="card-header">{image.name}</p>
    {children}
    <img className="img-fluid" src={image.path} alt={image.name}/>
  </div>)
}

export default ImageCard;