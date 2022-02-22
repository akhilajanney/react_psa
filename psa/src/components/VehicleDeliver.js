import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";
import html2pdf from "html2pdf.js";

axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

class VehicleDeliver extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load getting list of vehicle that completed service and waiting for delivery */
  componentDidMount = () => {
    this.vehicleStatus();
  };

  vehicleStatus = () => {
    $("#completed").empty();
    axios({ method: "GET", url: "/api/service/status" })
      .then((response) => {
        if (response.status === 200) {
          let completed = response.data.completed;
          let running = response.data.running;
          if (completed.length !== 0 || running.length !== 0) {
            let len = 1;
            for (let i in completed) {
              $("#completed").append(
                "<tr id=" +
                  completed[i].ServiceNumber +
                  "><td>" +
                  len +
                  "</td><td>" +
                  completed[i].CarNumber +
                  "</td><td>" +
                  completed[i].CarColor +
                  "</td><td>" +
                  completed[i].ServiceNumber +
                  "</td><td>" +
                  completed[i].CustomerName +
                  "</td><td>" +
                  completed[i].PhoneNumber +
                  "</td><td>" +
                  completed[i].Address +
                  "</td><td>" +
                  completed[i].TagId.tagid +
                  "</td><td>" +
                  completed[i].ServiceDate +
                  "</td></tr>"
              );
              len = len + 1;
            }
            for (let i in running) {
              $("#completed").append(
                "<tr id=" +
                  running[i].ServiceNumber +
                  "><td>" +
                  len +
                  "</td><td>" +
                  running[i].CarNumber +
                  "</td><td>" +
                  running[i].CarColor +
                  "</td><td>" +
                  running[i].ServiceNumber +
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
              len = len + 1;
            }
          } else {
            $("#freeTagForm").css("display", "none");
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No vehicle available for deliver");
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

  /** On vehicle deliver free the already assigned tag for new vehicle */
  deliverCar = () => {
    $("#message").text("");
    $("#message").removeAttr("class");
    let data = { servicenumber: $("#regNumber").val() };

    if (data.servicenumber.length !== 0) {
      axios({ method: "PUT", url: "/api/vehicle/deliver", data: data })
        .then((resp) => {
          console.log('deliver',resp)
          if (resp.status === 200) {
            $("#message").attr("class", "msg success-msg");
            $("#message").text(
              "Vehicle is Delivered successfully. Tag is free for new vehicle registration."
            );
            this.vehicleStatus();
            this.getHistory($("#regNumber").val());
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("Invalid register number.");
          }
        })
        .catch((error) => {
          $("#message").attr("class", "msg error-msg");
          if (error.response.status === 500)
            $("#message").text("Internal Server Error.");
          else $("#message").text(error);
        });
    } else {
      $("#message").attr("class", "msg error-msg");
      $("#message").text("Please enter vehicle registration number.");
    }
    setTimeout(() => {
      $("#message").text("");
      $("#regNumber").val("");
    }, 1000 * 3);
  };

  /** Getting zone wise movement history of a particular vehicle */
  getHistory = (servicenumber) => {
    // $("#displaymodel").css("display", "block");
    $("#message").text("");
    $("#message").removeAttr("class");

    axios({
      method: "POST",
      url: "/api/service/summary",
      data: { servicenumber: servicenumber },
    })
      .then((response) => {
        if (response.status === 200) {
          $("#displaymodel").css("display", "block");
          $("#serviceHistory").empty();
          let dt = new Date();
          let temp_dt =
            dt.getDate() +
            "-" +
            parseInt(dt.getMonth() + 1) +
            "-" +
            dt.getFullYear();
          $("#name").text(response.data.vehicle.CustomerName);
          $("#mailid").text(response.data.vehicle.MailID);
          $("#phone").text(response.data.vehicle.PhoneNumber);
          $("#addr").text(response.data.vehicle.Address);
          $("#car").text(response.data.vehicle.CarNumber);
          $("#dt2").text(response.data.vehicle.ServiceDate);
          $("#eff").text(Math.round(response.data.vehicle.Efficiency) + "%");
          $("#dt1").text(temp_dt);
          if (response.data.history.length !== 0) {
            let data = response.data.history;
            let zonename = data[0].zonename;
            let sl = 1;
            let tempstart_time = data[0].timestamp,
              tempend_time = data[0].timestamp,
              tempduration = 0;
            for (let i = 1; i < data.length; i++) {
              if (data[i].zonename === zonename) {
                if (
                  parseInt(
                    (new Date(data[i].timestamp) -
                      new Date(data[i - 1].timestamp)) /
                      1000
                  ) <= 15
                ) {
                  tempend_time = data[i].timestamp;
                } else {
                  tempduration =
                    tempduration +
                    parseInt(
                      (new Date(tempend_time) - new Date(tempstart_time)) / 1000
                    );
                  tempstart_time = data[i].timestamp;
                  tempend_time = data[i].timestamp;
                }
              } else {
                let hh = Math.floor(tempduration / 3600);
                if (hh < 10) hh = "0" + hh;
                let mm = Math.floor((tempduration % 3600) / 60);
                if (mm < 10) mm = "0" + mm;
                let ss = Math.floor((tempduration % 3600) % 60);
                if (ss < 10) ss = "0" + ss;
                let duration = hh + ":" + mm + ":" + ss;

                $("#serviceHistory").append(
                  "<tr><td>" +
                    sl +
                    "</td><td>" +
                    zonename +
                    "</td><td>" +
                    duration +
                    "</td></tr>"
                );
                sl = sl + 1;
                zonename = data[i].zonename;
                tempstart_time = data[i].timestamp;
                tempend_time = data[i].timestamp;
                tempduration = 0;
              }
            }
            let hh = Math.floor(tempduration / 3600);
            if (hh < 10) hh = "0" + hh;
            let mm = Math.floor((tempduration % 3600) / 60);
            if (mm < 10) mm = "0" + mm;
            let ss = Math.floor((tempduration % 3600) % 60);
            if (ss < 10) ss = "0" + ss;
            let duration = hh + ":" + mm + ":" + ss;
            $("#serviceHistory").append(
              "<tr><td>" +
                sl +
                "</td><td>" +
                zonename +
                "</td><td>" +
                duration +
                "</td></tr>"
            );
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No data found.");
          }
          let rowCount = $("#serviceHistory").children("tr").length;
          if (rowCount > 0) {
            let tm_st = $("#serviceHistory")
              .children("tr")
              .eq(0)
              .children("td")
              .eq(2)
              .text();
            let sec = parseInt(tm_st.split(":")[2]),
              min = parseInt(tm_st.split(":")[1]),
              hour = parseInt(tm_st.split(":")[0]);
            for (let i = 1; i < rowCount; i++) {
              let tm_ed = $("#serviceHistory")
                .children("tr")
                .eq(i)
                .children("td")
                .eq(2)
                .text();
              sec = sec + parseInt(tm_ed.split(":")[2]);
              min = min + parseInt(tm_ed.split(":")[1]);
              hour = hour + parseInt(tm_ed.split(":")[0]);
            }
            let temp1 = sec % 60; //finding seconds
            min = min + parseInt(sec / 60);
            let temp2 = min % 60;
            hour = hour + parseInt(min / 60);
            let temp3 = hour % 24;
            let day = parseInt(hour / 24);
            $("#dur").text(day + " Days, " + temp3 + ":" + temp2 + ":" + temp1);
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

  downloadpdf = () => {
    var opt = {
      margin: 0.75,
      filename: "report.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 1,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "p",
      },
    };
    html2pdf().from(document.getElementById("download_pdf")).set(opt).save();
    $("#displaymodel").css("display", "none");
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Vehicle - Deliver Car</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Deliver Car after Service</p>
            <hr></hr>

            <form className="main" id="freeTagForm">
              <fieldset>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Reg. Number:</label>
                    <input
                      type="text"
                      id="regNumber"
                      className="input"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <input
                    type="button"
                    className="btn success-btn btn-green btn-fitcontent"
                    value="Deliver Vehicle"
                    onClick={this.deliverCar}
                  />
                </div>
              </fieldset>
            </form>

            <p id="message"></p>
            <p className="sub-heading">Vehicles Ready for Deliver</p>
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
                  <th>REG. NUMBER</th>
                  <th>CUSTOMER NAME</th>
                  <th>PHONE NO.</th>
                  <th>ADDRESS</th>
                  <th>TAG ID</th>
                  <th>REG. DATE</th>
                </tr>
              </thead>
              <tbody id="completed"></tbody>
            </table>
          </div>
        </div>
        <div className="model" id="displaymodel" style={{ display: "none" }}>
          <div
            className="modelbox"
            style={{ maxWidth: "70vw", overflow: "auto" }}
          >
            <div
              id="download_pdf"
              className="row"
              style={{ fontFamily: "Roboto-Regular" }}
            >
              <div>
                <img
                  alt=""
                  src="../images/Tiles/PSALogo1.png"
                  style={{
                    width: "70px",
                    height: "30px",
                  }}
                  className="btn-center"
                />
                <p
                  className="heading"
                  style={{ textAlign: "center", fontSize: "30px" }}
                >
                  Service Details
                </p>
                <br></br>
                <hr></hr>
                <p style={{ float: "right" }}>
                  Date : <span id="dt1"></span>
                </p>
              </div>
              <br></br>
              <div>
                <p>
                  Customer Name : <span id="name"></span>
                </p>
                <p>
                  Mail ID : <span id="mailid"></span>
                </p>
                <p>
                  Phone Number : <span id="phone"></span>
                </p>
                <p>
                  Address : <span id="addr"></span>
                </p>
                <p>
                  Car Number : <span id="car"></span>
                </p>
                <p>
                  Registration Date : <span id="dt2"></span>
                </p>
              </div>
              <br></br>
              <p className="sub-heading" style={{ fontSize: "18px" }}>
                Service Summary...
              </p>
              <table>
                <thead id="tableheader">
                  <tr>
                    <th>Sl. NO.</th>
                    <th>SERVICE NAME</th>
                    <th>SERVICE DURATION</th>
                    {/* <th>STATUS</th> */}
                  </tr>
                </thead>
                <tbody id="serviceHistory"></tbody>
              </table>
              <p style={{ float: "right" }}>
                Total Duration : <span id="dur"></span>
              </p>
              <p style={{ float: "right", clear: "both" }}>
                Efficiency : <span id="eff"></span>
              </p>
              <div className="row">
                <hr></hr>
                <p
                  style={{
                    textAlign: "center",
                    display: "block",
                    lineHeight: "28px",
                  }}
                >
                  Powered by: Vacus Tech Pvt Ltd.
                </p>
              </div>
            </div>

            <button
              className="btn btn-success btn-green btn-fitcontent btn-center "
              onClick={this.downloadpdf}
              style={{ display: "block" }}
            >
              Download PDF
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleDeliver;
