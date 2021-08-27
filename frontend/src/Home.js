import React from "react";
import SearchForm from "./SearchForm";
import ImageList from "./ImageList";


/** Home: shows image search form that filters images shown
 * and a list of all images or images that matches search
 * 
 *  props:
 *  - isLoading: boolean
 * 
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