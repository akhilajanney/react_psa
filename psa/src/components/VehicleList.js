import React, { Fragment, PureComponent } from "react";
import axios from "axios";
import $ from "jquery";
import { Helmet } from "react-helmet";

class VehicleList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load getting get the list of vehicles, newly registered and under service */
  componentDidMount = () => {
    axios({ method: "GET", url: "/api/service/status" })
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          let newReg = response.data.new;
          let running = response.data.running;
          if (newReg.length !== 0) {
            $("#new").empty();
            for (let i in newReg) {
              $("#new").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  newReg[i].CarNumber +
                  "</td><td>" +
                  newReg[i].CarColor +
                  "</td><td>" +
                  newReg[i].CustomerName +
                  "</td><td>" +
                  newReg[i].PhoneNumber +
                  "</td><td>" +
                  newReg[i].Address +
                  "</td><td>" +
                  newReg[i].TagId.tagid +
                  "</td><td>" +
                  newReg[i].ServiceDate +
                  "</td></tr>"
              );
            }
          }
          if (running.length !== 0) {
            $("#running").empty();
            for (let i in running) {
              $("#running").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  running[i].CarNumber +
                  "</td><td>" +
                  running[i].CarColor +
                  "</td><td>" +
                  running[i].CustomerName +
                  "</td><td>" +
                  running[i].PhoneNumber +
                  "</td><td>" +
                  running[i].Address +
                  "</td><td>" +
                  running[i].TagId.tagid +
                  "</td><td>" +
                  running[i].ServiceDate +
                  "</td></tr>"
              );
            }
          }
        }
      })
      .catch((error) => {
        $("#message").attr("class", "msg error-msg");
        if (error.response.status === 500)
          $("#message").text("Internal Server Error.");
        else $("#message").text(error);
      });
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Vehicle - Vehicle Details</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Vehicle Details</p>
            <hr></hr>
            <p id="message"></p>
            <p className="sub-heading">Vehicles Newly Registered</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>CAR NUMBER</th>
                  <th>CAR COLOR</th>
                  <th>CUSTOMER NAME</th>
                  <th>PHONE NO.</th>
                  <th>ADDRESS</th>
                  <th>TAG ID</th>
                  <th>REG. DATE</th>
                </tr>
              </thead>
              <tbody id="new"></tbody>
            </table>
            <p className="sub-heading">Vehicles Under Service</p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>CAR NUMBER</th>
                  <th>CAR COLOR</th>
                  <th>CUSTOMER NAME</th>
                  <th>PHONE NO.</th>
                  <th>ADDRESS</th>
                  <th>TAG ID</th>
                  <th>REG. DATE</th>
                </tr>
              </thead>
              <tbody id="running">
                {/* <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleList;
