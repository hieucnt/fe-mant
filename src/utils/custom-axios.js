import axios from "axios";
import { NO_INTERNET } from "../constants";
import { message } from "antd";
let totalNoInternetRequest = 0;

const customAxios = axios.create();

// Request interceptor for API calls
customAxios.interceptors.request.use(
  async (config) => {
    // let auth_info = clonedStore.getState().User.auth_info;

    // if (auth_info && auth_info.access_token) {

    //     if (isTokenExpiration(auth_info.expireDate)) {

    //         isGettingNewAccessToken = true;

    //         let response = await userAPI.getNewAccessToken(auth_info.refresh_token);

    //         clonedStore.dispatch(tokenRefreshSuccess(response));

    //         auth_info = clonedStore.getState().User.auth_info;

    //         config.headers['Authorization'] = `Bearer ${auth_info.access_token}`;

    //         isGettingNewAccessToken = false;
    //     }

    //     config.headers['Authorization'] = `Bearer ${auth_info.access_token}`;
    // }

    // await checkGettingAccessToken();

    if (!window.navigator.onLine) {
      totalNoInternetRequest++;

      let cancelTokenSource = axios.CancelToken.source();
      config.cancelToken = cancelTokenSource.token;

      cancelTokenSource.cancel(NO_INTERNET);
    }
    // config.timeout = process.env.NEXT_PUBLIC_API_TIMEOUT;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(process.env.NEXT_PUBLIC_MESSAGE_ERROR_ON == 'true' ||
        (process.env.NEXT_PUBLIC_MESSAGE_ERROR_ON != 'true' &&
            error.message != 'Network Error' &&
            error.response?.data?.error?.statusCode != 404 &&
            error.response?.data?.error?.statusCode != 422 &&
            error.response?.data?.error?.statusCode != 500
        )
    ) {
      message.error(error.response?.data?.error?.message || error.message);
    }
    if (axios.isCancel(error)) {
      if (error.message === NO_INTERNET) {
        if (--totalNoInternetRequest === 0) {
          window.dispatchEvent(new Event(NO_INTERNET));
        }

        return {
          code: 0,
          data: {},
        };
      }
    }

    // if (error.response.status === 401) {

    //     const response = {
    //         code: 0,
    //         data: error.response.data.message,
    //     };

    //     return response;
    // }

    // if (error.response.status === 400) {

    //     const response = {
    //         code: 0,
    //         data: error.response.data.message,
    //     };

    //     return response;
    // }
    const response = {
      code: 0,
      data: error?.response?.data,
    };

    throw response;
  }
);

export { customAxios };
