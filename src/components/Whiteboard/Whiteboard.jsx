import { useRef, useState } from "react";
import "./Whiteboard.css";

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

import {
  saveWhiteboard,
  loadWhiteboard,
  clearWhiteboard,
} from "../../services/whiteboardService";

const SESSION_ID = "SESSION-001";
const USER_ID = "TRAINER001";

function Whiteboard() {
  const excalidrawAPI = useRef(null);

  const [message, setMessage] = useState("");

  // ==========================
  // Save Board
  // ==========================

  const handleSave = async () => {
    if (!excalidrawAPI.current) return;

    try {
      const elements = excalidrawAPI.current.getSceneElements();

      const appState = excalidrawAPI.current.getAppState();

      await saveWhiteboard({
        sessionId: SESSION_ID,
        userId: USER_ID,
        drawingData: {
          elements,
          appState,
        },
        toolType: "Pen",
        color: "#2563EB",
        strokeWidth: 2,
      });

      setMessage("✅ Whiteboard saved successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Reload Board
  // ==========================

  const handleReload = async () => {
    try {
      const res = await loadWhiteboard(SESSION_ID);

      if (!res.data.drawings.length) return;

      const latest =
        res.data.drawings[
          res.data.drawings.length - 1
        ];

      excalidrawAPI.current.updateScene({
        elements:
          latest.drawingData.elements || [],
        appState:
          latest.drawingData.appState || {},
      });

      setMessage("✅ Whiteboard loaded.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // Clear Board
  // ==========================

  const handleClear = async () => {
    try {
      await clearWhiteboard(SESSION_ID);

      excalidrawAPI.current.resetScene();

      setMessage("✅ Whiteboard cleared.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="whiteboard-card">

      <div className="whiteboard-header">

        <div>
          <h2>Whiteboard Development Sandbox</h2>
          <p>Create ideas, explain concepts and collaborate.</p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            className="join-btn"
            onClick={handleSave}
          >
            Save Board
          </button>

          <button
            className="join-btn"
            onClick={handleReload}
          >
            Reload
          </button>

          <button
            className="join-btn"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

      </div>

      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            background: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}

      <div className="canvas">
        <Excalidraw
          excalidrawAPI={(api) => {
            excalidrawAPI.current = api;
          }}
          theme="light"
        />
      </div>

    </div>
  );
}

export default Whiteboard;