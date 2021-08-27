import { useParams } from "react-router-dom";
import ImageCard from './ImageCard';
import PixlyApi from "./api";
import { useState, useEffect } from "react";

/**
 * get individual image from backend and display it with an image card
 * and it's details.
 * 
 * params:
 * -id: number
 * 
 * state:
 * -isLoading: boolean
 * -image: image object
*/
function ImageDetails(){
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState({});

  useEffect(function getImageOnMount() {
    async function getImage() {
      let imageFromAPI = await PixlyApi.getImage(id);
      setImage(imageFromAPI)
      setIsLoading(false);
    }
    getImage();
  }, [id])

  if (isLoading) return <div>Is Loading...</div>;

  return (
  <div className="container">
    <ImageCard image={image}>
      <ul>
        {Object.keys(image).map( key =>{
          if(image[key]){
            return <li key={key}> {key} : {image[key]}</li>
          }
          return null
        })}
      </ul>
    </ImageCard>
  </div>)
}

export default ImageDetails;