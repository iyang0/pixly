import ImageCard from "./ImageCard"
import { Link } from "react-router-dom"

function ImageList({ 
  images = 
  [{url: "https://i.imgur.com/x2Xf5nj.jpeg", name:"cat1"},
  {url: "https://i.imgur.com/O6SqEc1.jpeg", name:"cat2"}] 
}){
  
  return(<div>IMAGE LIST
    <ul>
      {images.map( image => (
      <Link to={"/"}><ImageCard key={image.name} image={image}/></Link>
      ))}
    </ul>
  </div>)
}

export default ImageList