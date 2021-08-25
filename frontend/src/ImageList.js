import ImageCard from "./ImageCard"
import { Link } from "react-router-dom"

function ImageList({images}){
  
  return(<div>IMAGE LIST
    <ul>
      {images.map( image => (
      <Link to={"/"} key={image.name} ><ImageCard image={image}/></Link>
      ))}
    </ul>
  </div>)
}

export default ImageList