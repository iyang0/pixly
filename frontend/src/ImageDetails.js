import { useContext } from 'react';
import ImagesContext from './ImagesContext';
import { useParams } from "react-router-dom";
import ImageCard from './ImageCard';

function ImageDetails(){
  const { id } = useParams();
  const {images} = useContext(ImagesContext);
  console.log("ID", id);
  let image = images.find(image => +image.id === +id);
  console.log("IMAGE", image);
  return (
  <div className="container">
    <ImageCard image={image}/>
  </div>)
}

export default ImageDetails;