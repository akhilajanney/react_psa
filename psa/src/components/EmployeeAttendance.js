import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import axios from "axios";

class EmployeeAttendance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load: Calculates number of days for current month and created table heading */
  componentDidMount() {
    let date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let year = date.getFullYear();
    let month = date.getMonth();
    let days = new Date(year, month + 1, 0).getDate();
    this.dayNo = days;
    $("#month_year").text(
      "attendance report for : " + monthNames[month] + ", " + year
    );
    $("#attendanceHead").empty();
    let row = "<tr><th>SL NO.</th><th>EMPLOYEE NAME</th><th>TAG MAC ID</th>";
    for (let i = 1; i <= days; i++) {
      row += "<th>" + i + "</th>";
    }
    row += "</tr>";
    $("#attendanceHead").append(row);

    this.getAtteandanceDetails();
  }

  /** Call api for attendance records of all registered employees
      Displays all information in table format */
  getAtteandanceDetails = () => {
    /* Calling api for employee attendance details */
    axios({ method: "GET", url: "/api/employee/attendancesheet" })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length !== 0) {
            $("#attendanceTable").empty();
            let data = response.data;
            for (let i = 0; i < data.length; i++) {
              let std =
                "<tr><td>" +
                (i + 1) +
                "</td><td>" +
                data[i].asset.empname +
                "</td><td>" +
                data[i].asset.asset.tagid +
                "</td>";

              if (data[i].day_1 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_1 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }

              if (data[i].day_2 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_2 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_3 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_3 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_4 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_4 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_5 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_5 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_6 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_6 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_7 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_7 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_8 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_8 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_9 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_9 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_10 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_10 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_11 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_11 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_12 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_12 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_13 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_13 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_14 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_14 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_15 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_15 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_16 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_16 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_17 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_17 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_18 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_18 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_19 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_19 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_20 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_20 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_21 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_21 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_22 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_22 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_23 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_23 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_24 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_24 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_25 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_25 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_26 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_26 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_27 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_27 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }
              if (data[i].day_28 === "P") {
                std += '<td style="color:green;font-size:16px">&#x2714;</td>';
              } else if (data[i].day_28 === "A") {
                std += '<td style="color:red;font-size:18px">&#x292B;</td>';
              } else {
                std += '<td style="font-size:18px">-</td>';
              }

              if (this.dayNo === 29) {
                if (data[i].day_29 === "P") {
                  std += '<td style="color:green;font-size:16px">&#x2714;</td>';
                } else if (data[i].day_29 === "A") {
                  std += '<td style="color:red;font-size:18px">&#x292B;</td>';
                } else {
                  std += '<td style="font-size:18px">-</td>';
                }
              } else if (this.dayNo === 30) {
                if (data[i].day_29 === "P") {
                  std += '<td style="color:green;font-size:16px">&#x2714;</td>';
                } else if (data[i].day_29 === "A") {
                  std += '<td style="color:red;font-size:18px">&#x292B;</td>';
                } else {
                  std += '<td style="font-size:18px">-</td>';
                }
                if (data[i].day_30 === "P") {
                  std += '<td style="color:green;font-size:16px">&#x2714;</td>';
                } else if (data[i].day_30 === "A") {
                  std += '<td style="color:red;font-size:18px">&#x292B;</td>';
                } else {
                  std += '<td style="font-size:18px">-</td>';
                }
              } else if (this.dayNo === 31) {
                if (data[i].day_29 === "P") {
                  std += '<td style="color:green;font-size:16px">&#x2714;</td>';
                } else if (data[i].day_29 === "A") {
                  std += '<td style="color:red;font-size:18px">&#x292B;</td>';
                } else {
                  std += '<td style="font-size:18px">-</td>';
                }
                if (data[i].day_30 === "P") {
                  std += '<td style="color:green;font-size:16px">&#x2714;</td>';
                } else if (data[i].day_30 === "A") {
                  std += '<td style="color:red;font-size:18px">&#x292B;</td>';
                } else {
                  std += '<td style="font-size:18px">-</td>';
                }
                if (data[i].day_31 === "P") {
                  std += '<td style="color:green;font-size:16px">&#x2714;</td>';
                } else if (data[i].day_31 === "A") {
                  std += '<td style="color:red;font-size:18px">&#x292B;</td>';
                } else {
                  std += '<td style="font-size:18px">-</td>';
                }
              }
              $("#attendanceTable").append(std);
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
          <title>Employee - Attendance</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Monthly Attendance Sheet</p>
            <hr></hr>
            <p id="message"></p>
            <table
              style={{
                marginTop: "20px",
                marginBottom: "30px",
              }}
              id="attendanceData"
            >
              <thead id="attendanceHead"></thead>
              <tbody id="attendanceTable"></tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EmployeeAttendance;
