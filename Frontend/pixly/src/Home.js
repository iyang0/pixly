import React, { useState } from "react";


/** Home: shows image search form that filters images shown
 * 
 *  state:
 *    images 
 */

function Home() {
  const [ image, setImages ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  

  if (isLoading) return <div>Is Loading...</div>;

  return (
    <div>
      <SearchForm />
      <ImageList />
    </div>
  )
}