import "./Whiteboard.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

function Whiteboard() {

  return (

    <div className="whiteboard-card">

      <div className="whiteboard-header">

        <div>

          <h2>Whiteboard Development Sandbox</h2>

          <p>Create ideas, explain concepts and collaborate.</p>

        </div>

        <button className="join-btn">

          Live Session

        </button>

      </div>

      <div className="canvas">

        <Excalidraw
          theme="light"
        />

      </div>

    </div>

  );

}

export default Whiteboard;