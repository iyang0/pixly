import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import ImageList from "./ImageList";

/** Home: shows image search form that filters images shown
 * 
 *  props:
 *  - images: array of objects with image URL and other metadata
 * 
 *  state:
 *  isLoading
 */

function Home({images}) {
  
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(function noLongerLoading(){
    setIsLoading(false);
  },[])

  if (isLoading) return <div>Is Loading...</div>;

  return (
    <div>
      HOME
      <SearchForm />
      <ImageList />
    </div>
  )
}
export default Home;