
import axios from 'axios';

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
  });
  
  // Add a request interceptor
  // Step-2: Create request, response & error handlers
  const requestHandler = (request) => {
    // Token will be dynamic so we can use any app-specific way to always
    // fetch the new token before making the call
    request.headers.Authorization =  `Bearer ${getAccessToken()}`;
    request.headers.Organizationid = getOrgID();
  
    return request;
  };
  
  const responseHandler = (response) => {
    return response;
  };
  
  const errorHandler = (error) => {
    // Force signin if an api responded 403
    if (error.response.status === 403) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  };
  
  // Step-3: Configure/make use of request & response interceptors from Axios
  // Note: You can create one method say configureInterceptors, add below in that,
  // export and call it in an init function of the application/page.
  // api.interceptors.request.use(
  //   (request) => requestHandler(request),
  //   (error) => errorHandler(error)
  // );
  
  // api.interceptors.response.use(
  //   (response) => responseHandler(response),
  //   (error) => errorHandler(error)
  // );
  
  export default api;
  