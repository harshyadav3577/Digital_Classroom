import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const saveWhiteboard = (data) =>
  API.post("/whiteboard/save", data);

export const loadWhiteboard = (sessionId) =>
  API.get(`/whiteboard/${sessionId}`);

export const clearWhiteboard = (sessionId) =>
  API.delete(`/whiteboard/${sessionId}`);

export default API;