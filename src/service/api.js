import axios from "axios";

const baseUrl = "http://localhost:4000";
console.log(baseUrl);

//login

export function postLogin(data) {
  return axios.post(`${baseUrl}/api/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//Register

export function postRegister(data) {
  return axios.post(`${baseUrl}/api/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

//logout
export function postLogout() {
  return axios.post(`${baseUrl}/api/logout`);
}

export function GetUsers() {
  return axios.get(`${baseUrl}/api/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export function ExportUsers() {
  return axios.get(`${baseUrl}/api/export-users`, {
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export function UploadUsers(data) {
  return axios.post(`${baseUrl}/api/upload-users`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export function UpdateUsers(id, data) {
  return axios.put(`${baseUrl}/api/users/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export function DeleteUsers(id) {
  return axios.delete(`${baseUrl}/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}
