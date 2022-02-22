import React, { Component } from "react";
import { Link } from "react-router-dom";
import { home, vehicleRegisterOption, vehicleTracking } from "../paths/urls";
import "../styling/Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="sidebar">
        <Link to={home}>
          <i
            className="fa fa-bars"
            style={{
              fontSize: "30px",
              color: "rgba(0,0,0,0.5)",
              margin: "20px 0px",
            }}
          ></i>
        </Link>
        <Link to={vehicleRegisterOption}>
          <img
            alt=""
            src="../images/Icons/RegCarIcon.png"
            style={{ width: "30px", height: "30px" }}
            title="Register Car"
          />
        </Link>
        <Link to="">
          <img
            alt=""
            src="../images/Icons/AlertsIcon.png"
            style={{ width: "30px", height: "30px" }}
            title="Alerts"
          />
        </Link>
        <Link to={vehicleTracking}>
          <img
            alt=""
            src="../images/Icons/TrackIcon.png"
            style={{ width: "30px", height: "30px" }}
            title="Realtime Tracking"
          />
        </Link>
      </div>
    );
  }
}

export default Sidebar;
