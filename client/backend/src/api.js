import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:4000/api/`
});

api.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");

  if ( token != null ) {
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
    }
    config.headers = headers;
  }

  return config;
}, function (err) {
    console.log(err)
  return Promise.reject(err);
});

export default api ;
