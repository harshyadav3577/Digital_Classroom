import "./DigitalClassroom.css";
import Header from "../components/Header/Header";
import Whiteboard from "../components/Whiteboard/Whiteboard";
import ClassroomChat from "../components/ClassroomChat/ClassroomChat";

function DigitalClassroom() {
  return (
    <div className="page">

      <Header />

      <div className="main-content">

        <div className="whiteboard">
           <Whiteboard />
        </div>

        <div className="chat">
  <ClassroomChat />
</div>

      </div>

    </div>
  );
}

export default DigitalClassroom;