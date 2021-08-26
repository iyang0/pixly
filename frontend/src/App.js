import Nav from "./Nav";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import ImagesContext from "./ImagesContext";
import PixlyApi from "./api";

function App() {
  const [ images, setImages ] = useState(
    [{ path: "https://i.imgur.com/x2Xf5nj.jpeg", name: "cat1" },
    { path: "https://i.imgur.com/O6SqEc1.jpeg", name: "cat2" }]
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getAllImagesOnMount() {
    async function getAllImages() {
      let imagesFromAPI = await PixlyApi.getAllImages();
      console.log(imagesFromAPI.images);
      setImages(imagesFromAPI.images)
    }
    getAllImages();
    setIsLoading(false);
  }, [])

  return (
    <ImagesContext.Provider value={{images, setImages}}>
      <BrowserRouter>
        <Nav />
        <Routes loading={isLoading}/>
      </BrowserRouter>
    </ImagesContext.Provider>
  );
}

export default App;
