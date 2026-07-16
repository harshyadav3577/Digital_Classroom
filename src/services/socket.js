import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Socket Disconnected");
});

socket.onAny((event, ...args) => {
  console.log("📡 Event:", event, args);
});

export default socket;