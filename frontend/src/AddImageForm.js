import React, { useState, useContext } from "react";
import PixlyApi from "./api";
import { useHistory } from "react-router-dom";
import ImagesContext from './ImagesContext';

function AddImageForm() {
  const { setIsLoading, setImages, images } = useContext(ImagesContext);

  const [formData, setFormData] = useState({ img: "" });
  const history = useHistory()


  function handleChange(evt) {
    const { name, value } = evt.target;

    if (name === "title") {
      setFormData((fData) => ({
        ...fData,
        [name]: value,
      }));
    } else {
      let fReader = new FileReader();
      let filenameArr = evt.target.value.split("\\")
      let filename = filenameArr[filenameArr.length - 1];

      // readAsDataURL is async - it returns a promise to be fulfilled later
      fReader.readAsDataURL(evt.target.files[0]);
      fReader.onloadend = function (event) {
        setFormData((fData) => ({
          ...fData,
          img: event.target.result,
          filename
        }));
      }
      const [file] = evt.target.files;
      if (file) {
        document.getElementById("preview").src = URL.createObjectURL(file);
      }
    }
  }

  // Sends search back to parent component
  async function handleSubmit(evt) {
    evt.preventDefault();
    let newImage = await PixlyApi.addImage(formData);
    setIsLoading(true);
    setImages((images) => [...images, newImage.image])
    history.push("/");
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
        <br/>
        <img style={{height:"200px"}} id="preview" alt="preview" src="https://www.lifewire.com/thmb/eftN2JsqSF2O12jxqA216u4aNYk=/1250x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"/>
      </form>
    </div>
  )


}

export default AddImageForm;