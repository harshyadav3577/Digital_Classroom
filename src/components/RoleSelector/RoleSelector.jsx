import "./RoleSelector.css";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

function RoleSelector({ onSelect }) {
  return (
    <div className="role-overlay">

      <div className="role-card">

        <h2>Select Your Role</h2>

        <p>Choose how you want to join the classroom.</p>

        <div className="role-options">

          <div
            className="role-option"
            onClick={() =>
              onSelect({
                senderId: "TRAINER001",
                senderName: "Harsha Yadav",
                role: "Trainer",
              })
            }
          >
            <FaChalkboardTeacher className="role-icon" />

            <h3>Trainer</h3>

            <span>Manage the classroom</span>

          </div>

          <div
            className="role-option"
            onClick={() =>
              onSelect({
                senderId: "STUDENT001",
                senderName: "Rahul Patil",
                role: "Student",
              })
            }
          >
            <FaUserGraduate className="role-icon" />

            <h3>Student</h3>

            <span>Join as learner</span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RoleSelector;