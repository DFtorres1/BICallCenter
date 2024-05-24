import axios from "axios";
  
  const onRequest = (
    config
  ) => {
    const configuration = config;
  
    return configuration;
  };
  
  const onRequestError = (error) =>
    Promise.reject(error);
  
  const getCustomAxiosInstance = (
    axiosInstance
  ) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
  
    return axiosInstance;
  };
  
  const api = getCustomAxiosInstance(
    axios.create({
      baseURL: String(import.meta.env.VITE_API_URL),
      withCredentials: false,
    })
  );
  
  export default api;