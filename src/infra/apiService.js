import axios from "axios";

// create axios instance
const APIService = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
});

export { APIService };
