import customAxios from "../customAxios";

export default {
  getDnlTransactionLog: async () => {
    const response = await customAxios.get("/dnl-transaction-logs");
    return response.data;
  },
};
