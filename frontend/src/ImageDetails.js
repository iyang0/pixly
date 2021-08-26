import { useContext } from 'react';
import ImagesContext from './ImagesContext';
import { useParams } from "react-router-dom";

function ImageDetails(){
  const { id } = useParams();
  const {images} = useContext(ImagesContext);
  return (<div>
    <img alt={images[id].name} src={images[id].path}></img>
  </div>)
}

export default ImageDetails;