import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PixlyApi {

  // Individual API routes

  /** Get all the images, optional input of a search term
   * returns an object with array of Images
   {
    "images": [
      {
        "DateTime": null,
        "Make": null,
        "Model": null,
        "Software": null,
        "filename": "20210826_132905.jpg",
        "id": 1,
        "name": "20210826_132905.jpg",
        "path": "https://s3.us-west-1.amazonaws.com/ivan.pix.ly/20210826_132905.jpg"
      },
      {
        "DateTime": "Fri, 27 Aug 2021 12:24:32 GMT",
        "Make": "Apple",
        "Model": "iPhone SE",
        "Software": "13.3",
        "filename": "8A2C334E-1514-4D14-A86D-88943D83EC65.jpeg",
        "id": 2,
        "name": "8A2C334E-1514-4D14-A86D-88943D83EC65.jpeg",
        "path": "https://s3.us-west-1.amazonaws.com/ivan.pix.ly/8A2C334E-1514-4D14-A86D-88943D83EC65.jpeg"
      },...]
    }
   */

  static async getAllImages(searchTerm="") {
    let res = await axios.get(`${BASE_URL}/images?searchTerm=${searchTerm}`)
    return res.data;
  }

  /** Get specific image, takes an ID of an image for input.
   * returns an image object:
   * 
   {
      "DateTime": null,
      "Make": null,
      "Model": null,
      "Software": null,
      "filename": "20210826_132905.jpg",
      "id": 1,
      "name": "20210826_132905.jpg",
      "path": "https://s3.us-west-1.amazonaws.com/ivan.pix.ly/20210826_132905.jpg"
    }
   */

  static async getImage(id) {
    let res = await axios.get(`${BASE_URL}/images/${id}`);
    return res.data;
  }

  /** Add a new image, takes in an Image object as input
   * returns the image object if successful:
   * {
      "DateTime": null,
      "Make": null,
      "Model": null,
      "Software": null,
      "filename": "20210826_132905.jpg",
      "id": 1,
      "name": "20210826_132905.jpg",
      "path": "https://s3.us-west-1.amazonaws.com/ivan.pix.ly/20210826_132905.jpg"
    }
  */

  static async addImage(newImage) {
    console.log("IN API TO ADD IMAGE", newImage);
    let res = await axios({
      method: "post",
      url: `${BASE_URL}/images`,
      data: newImage,
    })
    return res.data;
  }

  /** updates an image, takes in an Image object as input 
   * and uses the ID of that image to patch over the image
   * returns the image object if successful:
   * {
      "DateTime": null,
      "Make": null,
      "Model": null,
      "Software": null,
      "filename": "20210826_132905.jpg",
      "id": 1,
      "name": "20210826_132905.jpg",
      "path": "https://s3.us-west-1.amazonaws.com/ivan.pix.ly/20210826_132905.jpg"
    }
  */

  static async updateImage(updatedImage) {
    let res = await axios.patch(`${BASE_URL}/images/${updatedImage.id}`, updatedImage);
    return res.data;
  }
}


export default PixlyApi;