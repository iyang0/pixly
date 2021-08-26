import ImageCard from "./ImageCard"
import { Link } from "react-router-dom"
import { useContext } from 'react';
import ImagesContext from './ImagesContext';

function ImageList(){
  const {images} = useContext(ImagesContext);
  return(<div>IMAGE LIST
    <ul>
      {images.map( image => (
      <Link to={"/"} key={image.name} ><ImageCard image={image}/></Link>
      ))}
    </ul>
  </div>)
}

export default ImageList