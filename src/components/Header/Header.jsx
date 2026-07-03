import "./Header.css";
import {
  FaGraduationCap,
  FaBell,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

function Header() {
  return (
    <header className="header">

      <div className="logo-section">
        <div className="logo-circle">
          <FaGraduationCap />
        </div>

        <div>
          <h2>Digital Classroom</h2>
          <p>Interactive Learning Workspace</p>
        </div>
      </div>

      <div className="header-icons">

        <FaBell className="icon" />

        <FaCog className="icon" />

        <div className="profile">

          <FaUserCircle className="profile-icon"/>

          <div>
            <h4>Harsha</h4>
            <span>Student</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;