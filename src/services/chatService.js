import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loadMessages = async (sessionId) => {
  return API.get(`/chat/session/${sessionId}`);
};

export default API;