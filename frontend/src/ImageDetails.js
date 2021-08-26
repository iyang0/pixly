import { useParams } from "react-router-dom";
import ImageCard from './ImageCard';
import PixlyApi from "./api";
import { useState, useEffect } from "react";

function ImageDetails(){
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState({});

  useEffect(function getImageOnMount() {
    async function getImage() {
      let imageFromAPI = await PixlyApi.getImage(id);
      console.log("GET IMAGE", imageFromAPI);
      setImage(imageFromAPI)
    }
    getImage();
    setIsLoading(false);
  }, [id])

  if (isLoading) return <div>Is Loading...</div>;

  return (
  <div className="container">
    <ImageCard image={image}/>
  </div>)
}

export default ImageDetails;