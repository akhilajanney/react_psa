import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";

class EmployeeReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load calling method and setting interval for the same */
  componentDidMount = () => {
    this.dailyReport();
    this.interval_employeeReport = setInterval(this.dailyReport, 1000 * 15);
  };

  /** On page unload clear interval set for daily report data */
  componentWillUnmount = () => {
    clearInterval(this.interval_employeeReport);
  };

  /** Displaying daily report of each employee
   *  Information is displayed in table format
   */
  dailyReport = () => {
    /* Calling API for employee daily report */
    axios({ method: "GET", url: "/api/employee/dailyreport" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data;
            $("#dailyReportTable").empty();
            for (let i in data) {
              let intime = data[i].asset.intime.substr(0, 19);
              let lastseen = data[i].asset.lastseen.substr(0, 19);
              $("#dailyReportTable").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].empname +
                  "</td><td>" +
                  data[i].asset.tagid +
                  "</td><td>" +
                  intime.substr(0, 10) +
                  " " +
                  intime.substr(11, 19) +
                  "</td><td>" +
                  lastseen.substr(0, 10) +
                  " " +
                  lastseen.substr(11, 19) +
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
          <title>Employee - Daily Report</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Employee Daily Report</p>
            <hr></hr>
            <p id="message"></p>
            {/* Table displays EMPLOYEE DAILY REPORTS */}
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
            >
              <thead>
                <tr>
                  <th>Sl .No</th>
                  <th>EMPLOYEE NAME</th>
                  <th>TAG MAC ID</th>
                  <th>INTIME</th>
                  <th>LAST SEEN</th>
                </tr>
              </thead>
              <tbody id="dailyReportTable"></tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EmployeeReport;
