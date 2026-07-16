import { useEffect, useRef, useState } from "react";
import "./ClassroomChat.css";
import { FaPaperPlane } from "react-icons/fa";

import socket from "../../services/socket";
import { loadMessages } from "../../services/chatService";

const SESSION_ID = "SESSION-001";

function ClassroomChat({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef(null);
  const joinedRef = useRef(false);

  // ==========================
  // Load Previous Messages
  // ==========================
  useEffect(() => {
    fetchMessages();

    if (!joinedRef.current) {
      joinedRef.current = true;

      socket.emit("join-session", {
        sessionId: SESSION_ID,
        user: currentUser,
      });
    }

    socket.on("receive-message", (message) => {
      console.log("📨 Frontend received:", message);

      setMessages((prev) => [...prev, message]);
    });

    socket.on("user-joined", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("user-left", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit("leave-session", {
        sessionId: SESSION_ID,
        user: currentUser,
      });

      socket.off("receive-message");
      socket.off("user-joined");
      socket.off("user-left");
    };
  }, [currentUser]);

  // ==========================
  // Auto Scroll
  // ==========================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ==========================
  // Fetch Old Messages
  // ==========================
  const fetchMessages = async () => {
    try {
      const res = await loadMessages(SESSION_ID);

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Send Message
  // ==========================
  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send-message", {
      sessionId: SESSION_ID,
      senderId: currentUser.senderId,
      senderName: currentUser.senderName,
      role: currentUser.role,
      message: input,
      messageType: "Text",
    });

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>💬 Classroom Chat</h3>
        <small>
          Logged in as <b>{currentUser.senderName}</b> ({currentUser.role})
        </small>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No messages yet.
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={
                msg.senderId === currentUser.senderId
                  ? "my-message"
                  : "other-message"
              }
            >
              <strong>{msg.senderName}</strong>

              <p>{msg.message}</p>

              <small>
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString()
                  : ""}
              </small>
            </div>
          ))
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ClassroomChat;