import { useState } from "react";
import "./DigitalClassroom.css";

import Header from "../components/Header/Header";
import Whiteboard from "../components/Whiteboard/Whiteboard";
import ClassroomChat from "../components/ClassroomChat/ClassroomChat";
import RoleSelector from "../components/RoleSelector/RoleSelector";

function DigitalClassroom() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {!currentUser && (
        <RoleSelector
          onSelect={(user) => setCurrentUser(user)}
        />
      )}

      {currentUser && (
        <div className="page">

          <Header />

          <div className="main-content">

            <div className="whiteboard">
              <Whiteboard />
            </div>

            <div className="chat">
              <ClassroomChat
                currentUser={currentUser}
              />
            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default DigitalClassroom;