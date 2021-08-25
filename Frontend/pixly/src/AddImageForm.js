import React, { useState } from "react";

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
    console.log(formData);

  }
  return (
    <div classname="AddImageForm">
      <form action="/localhost:5000/images" method="POST" onSubmit={handleSubmit}>
          <label for="img"> Upload Image</label>
        <input onChange={handleChange} type="file" id="img" name="img" accept="image/*">
          </input>
        <button type="submit">Upload Image</button>
        </form>
    </div>
  )


}

        export default AddImageForm;