import { useState } from "react";
import "./ClassroomChat.css";
import { FaPaperPlane } from "react-icons/fa";

function ClassroomChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Teacher",
      text: "Welcome to today's Digital Classroom 👋",
    },
    {
      id: 2,
      sender: "John",
      text: "Good Morning Everyone!",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "You",
        text: input,
      },
    ]);

    setInput("");
  };

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h3>💬 Classroom Chat</h3>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.sender === "You" ? "my-message" : "other-message"}
          >
            <strong>{msg.sender}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
}

export default ClassroomChat;