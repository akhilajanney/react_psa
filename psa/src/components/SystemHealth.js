import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";

class SystemHealth extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load calling health method and setting interval for 15 seconds */
  componentDidMount = () => {
    this.health();
    this.interval = setInterval(this.health, 1000 * 15);
    this.antinodedata();
    this.interval1 = setInterval(this.antinodedata, 1000 * 15);
  };

  /** Clearing interval set for health data  */
  componentWillUnmount = () => {
    clearInterval(this.interval);
    clearInterval(this.interval1);
  };

  /** Getting health data of master and slave gateways and vehicle and employee tags */
  health = () => {
    // /* API call to get health data of vehicle tags */
    axios({ method: "GET", url: "/api/masterhealth" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data;
            $("#masterGatewayTable").empty();
            for (let i in data) {
              let lastseen = data[i].lastseen.substr(0, 19);
              let timestamp =
                lastseen.substr(0, 10) + " " + lastseen.substr(11, 19);
              let status = "red";
              if (new Date() - new Date(timestamp) <= 2 * 60 * 1000)
                status = "green";
              $("#masterGatewayTable").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].tagid +
                  "</td><td>" +
                  timestamp +
                  "</td><td>" +
                  "<div class='circle' style='margin:auto;background-color:" +
                  status +
                  ";'></div></td></tr>"
              );
            }
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No data found for master");
          }
        }
      })
      .catch((error) => {
        $("#message").attr("class", "msg error-msg");
        if (error.response.status === 500)
          $("#message").text("Internal Server Error.");
        else $("#message").text(error);
      });

    // /* API call to get health data of vehicle tags */
    axios({ method: "GET", url: "/api/slavehealth" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data;
            $("#slaveGatewayTable").empty();
            for (let i in data) {
              let lastseen = data[i].lastseen.substr(0, 19);
              let timestamp =
                lastseen.substr(0, 10) + " " + lastseen.substr(11, 19);
              let status = "red";
              if (new Date() - new Date(timestamp) <= 2 * 60 * 1000)
                status = "green";
              $("#slaveGatewayTable").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].tagid +
                  "</td><td>" +
                  timestamp +
                  "</td><td>" +
                  "<div class='circle' style='margin:auto;background-color:" +
                  status +
                  ";'></div></td></tr>"
              );
            }
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No data found for Slave");
          }
        }
      })
      .catch((error) => {
        $("#message").attr("class", "msg error-msg");
        if (error.response.status === 500)
          $("#message").text("Internal Server Error.");
        else $("#message").text(error);
      });

    /* API call to get health data of vehicle tags */
    axios({ method: "GET", url: "/api/vehicle/taghealth" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data;
            $("#vehicleTagTable").empty();
            for (let i in data) {
              let lastseen = data[i].lastseen.substr(0, 19);
              let timestamp =
                lastseen.substr(0, 10) + " " + lastseen.substr(11, 19);
              let status = "red";
              if (new Date() - new Date(timestamp) <= 2 * 60 * 1000)
                status = "green";
              $("#vehicleTagTable").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].tagid +
                  "</td><td>" +
                  data[i].battery +
                  "</td><td>" +
                  timestamp +
                  "</td><td>" +
                  "<div class='circle' style='margin:auto;background-color:" +
                  status +
                  ";'></div></td></tr>"
              );
            }
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No data found");
          }
        }
      })
      .catch((error) => {
        $("#message").attr("class", "msg error-msg");
        if (error.response.status === 500)
          $("#message").text("Internal Server Error.");
        else $("#message").text(error);
      });

    /* API call to get health data of employee tags */
    // axios({ method: "GET", url: "/api/employee/taghealth" })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       if (response.data.length !== 0) {
    //         let data = response.data;
    //         $("#employeeTagTable").empty();
    //         for (let i in data) {
    //           let lastseen = data[i].lastseen.substr(0, 19);
    //           let timestamp =
    //             lastseen.substr(0, 10) + " " + lastseen.substr(11, 19);
    //           let status = "red";
    //           if (new Date() - new Date(timestamp) <= 2 * 60 * 1000)
    //             status = "green";
    //           $("#employeeTagTable").append(
    //             "<tr><td>" +
    //               (parseInt(i) + 1) +
    //               "</td><td>" +
    //               data[i].tagid +
    //               "</td><td>" +
    //               data[i].battery +
    //               "</td><td>" +
    //               timestamp +
    //               "</td><td>" +
    //               "<div class='circle' style='margin:auto;background-color:" +
    //               status +
    //               ";'></div></td></tr>"
    //           );
    //         }
    //       } else {
    //         $("#message").attr("class", "msg error-msg");
    //         $("#message").text("No data found.");
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     $("#message").attr("class", "msg error-msg");
    //     if (error.response.status === 500)
    //       $("#message").text("Internal Server Error.");
    //     else $("#message").text(error);
    //   });
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  /** Getting health data of antinode tags */
  antinodedata = () => {
    // /* API call to get health data of vehicle tags */
    axios({ method: "GET", url: "/api/antinodehealth" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data;
            $("#anitnodeTable").empty();
            for (let i in data) {
              let lastseen = data[i].lastseen.substr(0, 19);
              let timestamp =
                lastseen.substr(0, 10) + " " + lastseen.substr(11, 19);
              let status = "red";
              if (new Date() - new Date(timestamp) <= 3 * 60 * 60 * 1000)
                status = "green";
              $("#anitnodeTable").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].tagid +
                  "</td><td>" +
                  data[i].battery +
                  "</td><td>" +
                  timestamp +
                  "</td><td>" +
                  "<div class='circle' style='margin:auto;background-color:" +
                  status +
                  ";'></div></td></tr>"
              );
            }
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No data found for Antinode");
          }
        }
      })
      .catch((error) => {
        $("#message").attr("class", "msg error-msg");
        if (error.response.status === 500)
          $("#message").text("Internal Server Error.");
        else $("#message").text("Antinode, " + error + ".");
      });
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>System Health</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">System Health</p>
            <hr></hr>
            <p id="message"></p>

            <p className="sub-heading">Master Gateway</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>TAG MAC ID</th>
                  <th>LAST SEEN</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody id="masterGatewayTable"></tbody>
            </table>

            <p className="sub-heading">Slave Gateway</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>TAG MAC ID</th>
                  <th>LAST SEEN</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody id="slaveGatewayTable"></tbody>
            </table>

            <p className="sub-heading">Antinode</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>TAG MAC ID</th>
                  <th>BATTERY STATUS (%)</th>
                  <th>LAST SEEN</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody id="anitnodeTable"></tbody>
            </table>

            <p className="sub-heading">Vehicle Tags</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>TAG MAC ID</th>
                  <th>BATTERY STATUS (%)</th>
                  <th>LAST SEEN</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody id="vehicleTagTable"></tbody>
            </table>

            {/* <p className="sub-heading">Employee Tags</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>TAG MAC ID</th>
                  <th>BATTERY STATUS (%)</th>
                  <th>LAST SEEN</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody id="employeeTagTable"></tbody>
            </table> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SystemHealth;
