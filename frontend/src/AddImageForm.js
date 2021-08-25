import React, { useState } from "react";
import PixlyApi from "./api";

function AddImageForm() {
  const [ formData, setFormData] = useState({});

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("IN HANDLE SUBMIT FUNCTION",formData);
    // debugger;
    await PixlyApi.addImage(formData)
    // await PixlyApi.getAllImages()
  }
  return (
    <div className="AddImageForm">
      <form action="/localhost:5000/images" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="img"> Upload Image</label>
        <input onChange={handleChange} type="file" id="img" name="img" accept="image/*">
          </input>
        <button type="submit">Upload Image</button>
        </form>
    </div>
  )


}

        export default AddImageForm;