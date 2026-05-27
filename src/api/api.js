// import axios from "axios";

// // const API_BASE = "http://localhost:3000/api";

// // const api = axios.create({
// //   baseURL: API_BASE,
// //   timeout: 10000,
// // });
// const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000/api";

// const api = axios.create({
//   baseURL: API_BASE,
//   timeout: 10000,
// });

// // Add token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const authAPI = {
//   login: (credentials) => api.post("/auth/login", credentials),
// };

// export const postAPI = {
//   getAll: () => api.get("/posts"), // Changed from "/admin/posts" to "/posts"
//   getById: (id) => api.get(`/posts/${id}`),
//   create: (formData) =>
//     api.post("/posts", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     }),
//   update: (id, data) => {
//     // Check if data is FormData (for images) or plain object
//     if (data instanceof FormData) {
//       return api.put(`/posts/${id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     }
//     // For regular JSON update (no images)
//     return api.put(`/posts/${id}`, data, {
//       headers: { "Content-Type": "application/json" },
//     });
//   },
//   delete: (id) => api.delete(`/posts/${id}`),
// };

// export const categoryAPI = {
//   getAll: () => api.get("/categories"),
//   create: (data) => api.post("/categories", data),
//   update: (code, data) => api.put(`/categories/${code}`, data),
//   delete: (code) => api.delete(`/categories/${code}`),
// };

// export default api;
// api/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
};

export const postAPI = {
  getAll: () => api.get("/posts"),
  getById: (id) => api.get(`/posts/${id}`),
  create: (formData) =>
    api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) => {
    if (data instanceof FormData) {
      return api.put(`/posts/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    return api.put(`/posts/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
  delete: (id) => api.delete(`/posts/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get("/categories"),
  create: (data) => api.post("/categories", data),
  update: (code, data) => api.put(`/categories/${code}`, data),
  delete: (code) => api.delete(`/categories/${code}`),
};

// ✅ Comment API for Admin
export const commentAPI = {
  getAll: (page = 1, limit = 10, status = "all") => {
    let url = `/admin/comments?page=${page}&limit=${limit}`;
    if (status && status !== "all") {
      url += `&status=${status}`;
    }
    return api.get(url);
  },
  updateStatus: (id, status) =>
    api.put(`/admin/comments/${id}/status`, { status }),
  delete: (id) => api.delete(`/admin/comments/${id}`),
};

export default api;
