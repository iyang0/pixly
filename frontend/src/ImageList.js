import ImageCard from "./ImageCard"
import { Link } from "react-router-dom"
import { useContext } from 'react';
import ImagesContext from './ImagesContext';

function ImageList(){
  const {images} = useContext(ImagesContext);

  return(<div className="ImageList container">IMAGE LIST
    <div className="row">
      {images.map( image => (
        <div className="col-3" key={image.name}>
          <Link to={`/${image.id}`} className="text-decoration-none" ><ImageCard image={image}/></Link>
        </div>
      ))}
    </div>
  </div>)
}

export default ImageList