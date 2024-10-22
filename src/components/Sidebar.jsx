import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/homepage">Teams</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
