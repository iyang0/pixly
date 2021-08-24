import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PixlyApi {

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all the images. */

  static async getAllImages() {
    let res = await this.request(`images`);
    return res;
  }

  /** Get specific image. */

  static async getImage(id) {
    let res = await this.request(`images/${id}`);
    return res;
  }

  /** Add a new image. */

  static async addImage(newImage) {
    let res = await this.request(`images`, newImage, "post");
    return res;
  }

  /** Update specific image. */

  static async updateImage(updatedImage) {
    let res = await this.request(`images/${updatedImage.id}`, updatedImage, "patch");
    return res;
  }
}


export default PixlyApi;