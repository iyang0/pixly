import Nav from "./Nav";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import "bootswatch/dist/sandstone/bootstrap.min.css";
import ImagesContext from "./ImagesContext";

function App() {
  const [ images, setImages ] = useState([]);

  
  return (
    <ImagesContext.Provider value={{images}}>
      <BrowserRouter>
        <Nav />
        <Routes images={images} />
      </BrowserRouter>
    </ImagesContext.Provider>
  );
}

export default App;
