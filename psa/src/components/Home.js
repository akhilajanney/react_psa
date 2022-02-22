import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import axios from "axios";
// import $ from "jquery";
import {
  // empAlerts,
  // empAttendance,
  // empList,
  // empRegister,
  // empReport,
  // empTracking,
  serviceAlert,
  // serviceReport,
  systemHealth,
  // vehicleDelivey,
  vehicleList,
  vehicleRegisterOption,
  vehicleTracking,
} from "../paths/urls";
import "../styling/Styling.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load find vehicle count
   *  Total vehicle in servcing centre
   *  Vehicle waiting for deliver
   *  Vehicle Under service
   *  Vehicle waiting for service
   *  Total number of employees at centre
   */
  componentDidMount = () => {
    // axios({ method: "GET", url: "/api/employee/tracking" })
    //   .then((resp) => {
    //     if (resp.status === 200) {
    //       if (resp.data.length !== 0) {
    //         $("#totalEmployees").text(resp.data.length);
    //       }
    //     }
    //   })
    //   .catch((error) => {});
  };

  /** Slide moving code for options for service, employee and system health */
  // moveSlide = (n) => {
  //   $("#slide1").css("display", "none");
  //   $("#slide2").css("display", "none");
  //   // $("#slide3").css("display", "none");
  //   $("#" + n).css("display", "block");
  // };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <div className="mySlide" id="slide1">
              <div className="row" style={{ position: "relative" }}>
                <p className="sub-heading">Service</p>
                {/* <i
                  className="fa fa-caret-right"
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    fontSize: "45px",
                    color: "rgba(0,0,0,0.5)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.moveSlide("slide2");
                  }}
                ></i> */}
                <hr></hr>
                <div className="col-3">
                  <Link to={vehicleRegisterOption}>
                    <img
                      alt=""
                      src="../images/widgets/RegisterWidget.png"
                      style={{ width: "100%", height: "400px" }}
                    ></img>
                  </Link>
                </div>
                <div className="col-34">
                  <div className="col-3">
                    {/* <Link to={serviceReport}>
                      <img
                        alt=""
                        src="../images/widgets/ReportsWidget.png"
                        style={{ width: "100%", height: "110px" }}
                      ></img>
                    </Link> */}
                    <Link to={vehicleTracking}>
                      <img
                        alt=""
                        src="../images/widgets/TrackWidget.png"
                        style={{
                          width: "100%",
                          height: "270px",
                          marginBottom: "5px",
                        }}
                      ></img>
                    </Link>
                  </div>
                  <div className="col-3">
                    {/* <Link to="">
                      <img
                        alt=""
                        src="../images/widgets/BillUploadWidget.png"
                        style={{ width: "100%", height: "110px" }}
                      ></img>
                    </Link> */}
                    <Link to={serviceAlert}>
                      <img
                        alt=""
                        src="../images/widgets/AlertsWidget.png"
                        style={{
                          width: "100%",
                          height: "270px",
                          marginBottom: "5px",
                        }}
                      ></img>
                    </Link>
                  </div>
                  <div className="col-3">
                    <Link to={vehicleList}>
                      <img
                        alt=""
                        src="../images/widgets/CarInventoryWidget.png"
                        style={{
                          width: "100%",
                          height: "270px",
                          marginBottom: "5px",
                        }}
                      ></img>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mySlide" id="slide2">
              <div className="row" style={{ position: "relative" }}>
                <p className="sub-heading">Employee</p>
                <i
                  className="fa fa-caret-right"
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    fontSize: "45px",
                    color: "rgba(0,0,0,0.5)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.moveSlide("slide3");
                  }}
                ></i>
                <hr></hr>
                <div className="col-3">
                  <Link to={empRegister}>
                    <img
                      alt=""
                      src="../images/widgets/EmpRegistration.png"
                      style={{ width: "100%", height: "400px" }}
                    ></img>
                  </Link>
                </div>
                <div className="col-34">
                  <div className="col-3">
                    <Link to={empReport}>
                      <img
                        alt=""
                        src="../images/widgets/EmpReportsWidget.png"
                        style={{ width: "100%", height: "110px" }}
                      ></img>
                    </Link>
                    <Link to={empTracking}>
                      <img
                        alt=""
                        src="../images/widgets/TrackEmpWidget.png"
                        style={{
                          width: "100%",
                          height: "270px",
                          marginBottom: "5px",
                        }}
                      ></img>
                    </Link>
                  </div>
                  <div className="col-3">
                    <Link to={empAttendance}>
                      <img
                        alt=""
                        src="../images/widgets/AttendanceWidget.png"
                        style={{ width: "100%", height: "110px" }}
                      ></img>
                    </Link>
                    <Link to={empAlerts}>
                      <img
                        alt=""
                        src="../images/widgets/EmpAlertWidget.png"
                        style={{
                          width: "100%",
                          height: "270px",
                          marginBottom: "5px",
                        }}
                      ></img>
                    </Link>
                  </div>
                  <div className="col-3">
                    <Link to={empList}>
                      <img
                        alt=""
                        src="../images/widgets/EmployeesWidget.png"
                        style={{
                          width: "100%",
                          height: "270px",
                          marginBottom: "5px",
                        }}
                      ></img>
                    </Link>
                  </div>
                </div>
              </div>
            </div>  */}

            <div className="mySlide" id="slide2">
              <div className="row" style={{ position: "relative" }}>
                <p className="sub-heading">System</p>
                {/* <i
                  className="fa fa-caret-right"
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "0px",
                    fontSize: "45px",
                    color: "rgba(0,0,0,0.5)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    this.moveSlide("slide1");
                  }}
                ></i> */}
                <hr></hr>
                <div className="col-34">
                  <div className="col-3">
                    <Link to={systemHealth}>
                      <img
                        alt=""
                        src="../images/widgets/SystemHealthWidget.png"
                        style={{ width: "100%", height: "220px" }}
                      ></img>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="model">
          <div className="modelbox">
            <p className="modelcontent">error message</p>
            <button className="modelbtn">OK</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
