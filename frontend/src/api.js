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

  /** Get all the images. */

  static async getAllImages() {
    console.log("IN getAllImages")
    let res = await axios.get(`${BASE_URL}/images`)
    return res.data;
  }

  /** Get specific image. */

  static async getImage(id) {
    let res = await axios.get(`${BASE_URL}/images/${id}`);
    return res.data;
  }

  /** Add a new image. */

  static async addImage(newImage) {
    console.log("IN API TO ADD IMAGE", newImage);
    let res = await axios({
      method: "post",
      url: `${BASE_URL}/images`,
      data: newImage,
    })
    return res.data;
  }

  /** Update specific image. */

  static async updateImage(updatedImage) {
    let res = await axios.patch(`${BASE_URL}/images/${updatedImage.id}`, updatedImage);
    return res.data;
  }
}


export default PixlyApi;