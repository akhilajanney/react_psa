import React, { Fragment, PureComponent } from "react";
import axios from "axios";
import $ from "jquery";
import { Helmet } from "react-helmet";

class EmployeeList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load:
   * get list of all registered employees.
   * Display information in table format.
   */
  componentDidMount = () => {
    /* Calling api for employee details */
    axios({ method: "GET", url: "/api/employee/registration" })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          if (data.length !== 0) {
            $("#employee").empty();
            for (let i in data) {
              $("#employee").append(
                "<tr><td>" +
                  (parseInt(i) + 1) +
                  "</td><td>" +
                  data[i].empname +
                  "</td><td>" +
                  data[i].empid +
                  "</td><td>" +
                  data[i].mailid +
                  "</td><td>" +
                  data[i].phoneno +
                  "</td><td>" +
                  data[i].dob +
                  "</td><td>" +
                  data[i].address +
                  "</td><td>" +
                  data[i].asset.tagid +
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
          <title>Employee - List</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Employee Data</p>
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
                  <th>NAME</th>
                  <th>EMPLOYEE ID</th>
                  <th>MAIL ID</th>
                  <th>PHONE NUMBER</th>
                  <th>DOB</th>
                  <th>ADDRESS</th>
                  <th>TAG ID</th>
                </tr>
              </thead>
              <tbody id="employee">
                {/* <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EmployeeList;
