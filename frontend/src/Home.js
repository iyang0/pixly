import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import ImageList from "./ImageList";
import PixlyApi from "./api";

/** Home: shows image search form that filters images shown
 * 
 *  props:
 *  - images: array of objects with image URL and other metadata
 * 
 *  state:
 *  isLoading
 */

function Home({ images }) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getAllImagesOnMount() {
    async function getAllImages() {
      await PixlyApi.getAllImages
    }
    setIsLoading(false);
  }, [])

  if (isLoading) return <div>Is Loading...</div>;

  return (
    <div>
      HOME
      <SearchForm />
      <ImageList images={
        [{ url: "https://i.imgur.com/x2Xf5nj.jpeg", name: "cat1" },
        { url: "https://i.imgur.com/O6SqEc1.jpeg", name: "cat2" }]
      } />
    </div>
  )
}
export default Home;