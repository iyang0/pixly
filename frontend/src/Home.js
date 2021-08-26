import React from "react";
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

function Home({loading}) {

  if (loading) return <div>Is Loading...</div>;

  return (
    <div>
      <SearchForm />
      <ImageList />
    </div>
  )
}
export default Home;