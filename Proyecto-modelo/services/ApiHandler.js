// service/index.js
const axios = require("axios");

class SongsApi {
  constructor() {
    this.api = axios.create({
      baseURL: "https://openwhyd.org",
    });
  }

  getAdrienSongs = () => this.api.get("/adrien?format=json");
}

module.exports = SongsApi;
