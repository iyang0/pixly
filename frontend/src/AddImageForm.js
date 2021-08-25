import React, { useState } from "react";
import PixlyApi from "./api";

function AddImageForm() {
  const [formData, setFormData] = useState({img: ""});



  function handleChange(evt) {
    var input = evt.target;
    var fReader = new FileReader();

    // readAsDataURL is async - it returns a promise to be fulfilled later
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setFormData({img: event.target.result});
    }
  }

  console.log(formData)

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    await PixlyApi.addImage(formData);
  }

  return (
    <div className="AddImageForm">
      <form action="/localhost:5000/images" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="img"> Upload Image</label>
        <input 
          onChange={handleChange} 
          type="file" 
          id="img" 
          name="img" 
          accept="image/*"
          className="form-control"/>
        <button className="btn btn-primary" type="submit">Upload Image</button>
      </form>
    </div>
  )


}

export default AddImageForm;