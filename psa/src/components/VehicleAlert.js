import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";

class VehicleAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load calling service alert method and setting interval of 20 seconds */
  componentDidMount = () => {
    this.serviceAlert();
    this.intervalService = setInterval(this.serviceAlert, 1000 * 20);
  };

  /** Clearing interval set for service alert method */
  componentWillUnmount = () => {
    clearInterval(this.intervalService);
  };

  /** Getting alert records generated for service and displaying information in table format */
  serviceAlert = () => {
    axios({ method: "GET", url: "/api/vehicletagalert" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data;
            $("#alertTable").empty();
            for (let i in data) {
              $("#alertTable").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].asset.TagId.tagid +
                  "</td><td>" +
                  data[i].asset.CarNumber +
                  "</td><td>" +
                  data[i].servicename +
                  "</td><td>" +
                  data[i].timestamp.substr(0, 10) +
                  " " +
                  data[i].timestamp.substr(11, 19).split(".")[0] +
                  "</td></tr>"
              );
            }
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No data found.");
          }
        }
      })
      .catch((error) => {
        $("#message").attr("class", "msg error-msg");
        if (error.response.status === 500)
          $("#message").text("Internal Server Error.");
        else $("#message").text(error);
      });
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Vehicle - Tag Alert</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Alerts</p>
            <hr></hr>
            <p id="message" className="msg error-msg"></p>
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
                  <th>CAR NUMBER</th>
                  <th>SERVICE</th>
                  <th>TIMESTAMP</th>
                </tr>
              </thead>
              <tbody id="alertTable"></tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleAlert;
