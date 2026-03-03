// import axios from "axios";

// const API = "http://localhost:5000/api";

// const axiosInstance = axios.create({
//   baseURL: API,
// });

// // Automatically attach token to every request
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default axiosInstance;


import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api"
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;