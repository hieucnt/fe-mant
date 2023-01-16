import {customAxios} from "../../utils/custom-axios";

const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export default {
    getSupportedIds: async (id) => {
        let res = await customAxios({
            method: 'get',
            url: `${serverEndpoint}/supportedIDs?category_id=${id}`,
        });
        return res.data;
    },
};