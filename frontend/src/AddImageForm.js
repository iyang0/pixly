import React, { useState } from "react";
import PixlyApi from "./api";

function AddImageForm() {
  const [formData, setFormData] = useState({ img: "" });



  function handleChange(evt) {
    const { name, value } = evt.target;
  
    if (name === "title") {
      setFormData((fData) => ({
        ...fData,
        [name]: value,
      }));
    } else {
      let value = evt.target;
      let fReader = new FileReader();
      let filenameArr = value.value.split("\\")
      let filename = filenameArr[filenameArr.length - 1];

      // readAsDataURL is async - it returns a promise to be fulfilled later
      fReader.readAsDataURL(value.files[0]);
      fReader.onloadend = function (event) {
        setFormData((fData) => ({
          ...fData, 
          img: event.target.result, 
          filename 
        }));
        console.log(event.target.result);
      }
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
        <label htmlFor="title">Title:</label>
        <input className="form-control" name="title" type="text" onChange={handleChange} required></input>
        <label htmlFor="img"> Upload Image</label>
        <input
          onChange={handleChange}
          type="file"
          id="img"
          name="img"
          accept="image/*"
          className="form-control" />
        <button className="btn btn-primary" type="submit">Upload Image</button>
      </form>
    </div>
  )


}

export default AddImageForm;