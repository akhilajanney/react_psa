import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";

class EmployeeAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /* On page load get alert data for employee tags and displays in table format */
  componentDidMount = () => {
    /* Calling api for employee alert information */
    axios({ method: "GET", url: "" })
      .then((response) => {
        if (response.status === 200) {
        } else {
          $("#message").attr("class", "msg error-msg");
          $("#message").text("No alert data found for employee tags.");
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
          <title>Employee - Tag Alert</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Alerts</p>
            <hr></hr>
            <p id="message"></p>
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
                  <th>STATUS</th>
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

export default EmployeeAlert;
