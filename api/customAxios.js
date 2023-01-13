import axios from "axios";
const customAxios = axios.create({
  baseURL: "https://apidev.luz.monster",
});

customAxios.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${nookies.get({}).accessToken}`
    return config;
  },
  (error) => {
    console.log("error axios!");
    return Promise.reject(error);
  }
);

export default customAxios;
