import customAxios from "../customAxios";

export default {
  getDinos: async () => {
    const response = await customAxios.get("/nfts/search");
    return response.data;
  },
  getTotalDinos: async () => {
    const response = await customAxios.get("/nfts/count");
    return response.data.count;
  }
};
