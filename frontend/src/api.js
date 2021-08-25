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
    // let res = await this.request(`images`);
    console.log("IN getAllImages")
    let res = await axios.get(`${BASE_URL}/images`)
    return res.data;
  }

  /** Get specific image. */

  static async getImage(id) {
    let res = await this.request(`images/${id}`);
    return res;
  }

  /** Add a new image. */

  static async addImage(newImageUrl) {
    console.log("IN API TO ADD IMAGE", newImageUrl);
    let res = await axios.post(`${BASE_URL}/images`, newImageUrl);
    return res;
  }

  /** Update specific image. */

  static async updateImage(updatedImage) {
    let res = await this.request(`images/${updatedImage.id}`, updatedImage, "patch");
    return res;
  }
}


export default PixlyApi;