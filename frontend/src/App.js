import Nav from "./Nav";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import "bootswatch/dist/sandstone/bootstrap.min.css";

function App() {
  const [ images, setImages ] = useState([]);

  
  return (
    <BrowserRouter>
      <Nav />
      <Routes images={images}/>
    </BrowserRouter>
  );
}

export default App;
