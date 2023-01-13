import customAxios from "../customAxios";

export default {
  getTotalUsers: async () => {
    const response = await customAxios.get("/users/count");
    return response.data.count;
  }
};
