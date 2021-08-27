import ImageCard from "./ImageCard"
import { Link } from "react-router-dom"
import { useContext } from 'react';
import ImagesContext from './ImagesContext';

/**
 * component to show list of image cards based on images list from context
 * 
 * context:
 * - images: array of image objects
*/
function ImageList(){
  const {images} = useContext(ImagesContext);

  return(<div className="ImageList container">
    <div className="row">
      {images.map( image => (
        <div className="col-3" key={image.name}>
          <Link to={`/${image.id}`} className="text-decoration-none" >
            <ImageCard image={image}/>
          </Link>
        </div>
      ))}
    </div>
  </div>)
}

export default ImageList