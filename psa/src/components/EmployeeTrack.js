import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";

class EmployeeTrack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load getting floor map image and displaying it with proper width and height
   *  Calling a method for tracking data
   */
  componentDidMount = () => {
    /* Calling api for floor map image */
    axios({ method: "GET", url: "/api/uploadmap" })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          if (data.length !== 0) {
            this.px = 20;
            let img = document.createElement("img");
            // $(img).attr("src", data[0].image.substr(7, data[0].image.length));
            $(img).attr("src", data[0].image);
            $(img).attr("alt", "");
            $(img).attr("style", "width:100%; height:100%; z-index:-1");
            $("#floorDiv").css("width", this.px * data[0].width);
            $("#floorDiv").css("height", this.px * data[0].height);
            $("#floorDiv").css("position", "relative");
            $("#floorDiv").append(img);
            this.trackEmployee();
            this.interval = setInterval(this.trackEmployee, 15 * 1000);
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("No floor map available.");
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

  /** On page unload clear interval */
  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  /** Tracking all employees present current day */
  trackEmployee = () => {
    $("#message").text("");
    $("#message").removeAttr("class");
    /* Calling api for tracking data */
    axios({ method: "GET", url: "/api/employee/tracking" })
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            let data = resp.data;
            $("#floorDiv").children("i").remove();
            $("#floorDiv").children("p").remove();
            $("#tagID").empty();
            for (let i in data) {
              $("#tagID").append(
                "<option>" + data[i].asset.tagid + "</option>"
              );
              var emp = document.createElement("i");
              $(emp).attr("class", "fa fa-street-view");
              $(emp).attr("id", data[i].asset.tagid);
              $(emp).attr("title", data[i].asset.tagid);
              $(emp).on("click", () => {
                this.getHistory(data[i].asset.tagid);
              });
              $(emp).attr(
                "style",
                "cursor:pointer; font-size:20px; position:absolute; color:black; left:" +
                  data[i].asset.x * this.px +
                  "px; top:" +
                  data[i].asset.y * this.px +
                  "px;"
              );
              var p = document.createElement("p");
              $(p).text(data[i].empname);
              $(p).attr(
                "style",
                "font-size:11px; font-weight:bold; padding:2px; border:1px solid black; border-radius:5px; position:absolute; color:black; background:white; left:" +
                  data[i].asset.x * this.px +
                  "px; top:" +
                  (data[i].asset.y * this.px + 21) +
                  "px;"
              );
              $("#floorDiv").append(p);
              $("#floorDiv").append(emp);
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
  };

  /** Locating vehicle on floor map image based on search tag id */
  searchTag = () => {
    $("#floorDiv").children("i").css("display", "none");
    $("#floorDiv").children("p").css("display", "none");
    $("#" + $("#tagID").val()).css("display", "block");
  };

  /** History of particular employee
   *  Displayed in table format zonewise duration
   */
  getHistory = (tagID) => {
    $("#message").text("");
    $("#message").removeAttr("class");
    axios.defaults.xsrfHeaderName = "x-csrftoken";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "/api/employee/history",
      data: { tagid: tagID },
    })
      .then((response) => {
        if (response.status === 200) {
          $("#history").css("display", "block");
          $("#employeeHistory").empty();
          $("#name").text(response.data.emp.empname);
          $("#empid").text(response.data.emp.empid);
          $("#mailid").text(response.data.emp.mailid);
          $("#phone").text(response.data.emp.phoneno);
          $("#addr").text(response.data.emp.address);
          $("#tagid").text(response.data.emp.asset.tagid);
          if (response.data.history.length !== 0) {
            let data = response.data.history;
            let h = { starttime: "", endtime: "", zone: "" };
            h.starttime = data[0].timestamp;
            h.zone = data[0].zone;
            let sl = 1;
            for (let i = 1; i < data.length; i++) {
              if (data[i].zone === h.zone) {
                h.endtime = data[i].timestamp;
              } else {
                let diff = (new Date(h.endtime) - new Date(h.starttime)) / 1000;
                let hh = Math.floor(diff / 3600);
                if (hh < 10) hh = "0" + hh;
                let mm = Math.floor((diff % 3600) / 60);
                if (mm < 10) mm = "0" + mm;
                let ss = Math.floor((diff % 3600) % 60);
                if (ss < 10) ss = "0" + ss;
                let duration = hh + ":" + mm + ":" + ss;
                $("#employeeHistory").append(
                  "<tr><td>" +
                    sl +
                    "</td><td>" +
                    h.zone +
                    "</td><td>" +
                    h.starttime.substr(0, 10) +
                    " " +
                    h.starttime.substr(11, 19).split(".")[0] +
                    "</td><td>" +
                    h.endtime.substr(0, 10) +
                    " " +
                    h.endtime.substr(11, 19).split(".")[0] +
                    "</td><td>" +
                    duration +
                    "</td></tr>"
                );
                sl = sl + 1;
                h.starttime = data[i].timestamp;
                h.endtime = data[i].timestamp;
                h.zone = data[i].zone;
              }
            }

            let diff = (new Date(h.endtime) - new Date(h.starttime)) / 1000;
            let hh = Math.floor(diff / 3600);
            if (hh < 10) hh = "0" + hh;

            let mm = Math.floor((diff % 3600) / 60);
            if (mm < 10) mm = "0" + mm;

            let ss = Math.floor((diff % 3600) % 60);
            if (ss < 10) ss = "0" + ss;
            let duration = hh + ":" + mm + ":" + ss;

            $("#employeeHistory").append(
              "<tr><td>" +
                sl +
                "</td><td>" +
                h.zone +
                "</td><td>" +
                h.starttime.substr(0, 10) +
                " " +
                h.starttime.substr(11, 19).split(".")[0] +
                "</td><td>" +
                h.endtime.substr(0, 10) +
                " " +
                h.endtime.substr(11, 19).split(".")[0] +
                "</td><td>" +
                duration +
                "</td></tr>"
            );
            $("#demo").scrollTop($("#demo")[0].scrollHeight);
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
          <title>Employee - Realtime Tracking</title>
        </Helmet>
        <div className="container" id="demo">
          <div className="main" style={{ position: "relative" }}>
            <p className="heading">Realtime Tracking</p>
            <form>
              <select
                type="selec"
                style={{
                  position: "absolute",
                  right: "225px",
                  top: "0px",
                  height: "38px",
                  width: "170px",
                }}
                id="tagID"
                className="input"
              ></select>
              <input
                type="button"
                value="Search"
                style={{
                  position: "absolute",
                  right: "105px",
                  top: "0px",
                }}
                className="btn btn-fitcontent btn-green"
                onClick={this.searchTag}
              />
              <input
                type="button"
                value="Clear"
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                }}
                title="Clear Search"
                className="btn btn-fitcontent btn-green"
                onClick={() => {
                  $("#floorDiv").children("i").css("display", "block");
                  $("#floorDiv").children("p").css("display", "block");
                }}
              />
            </form>
            <hr></hr>
            <div id="floorDiv"></div>
            <p id="message"></p>
            <div id="history" style={{ display: "none", marginTop: "20px" }}>
              <div className="card">
                <p className="label">
                  Employee Name : <span id="name"></span>
                </p>
                <p className="label">
                  Employee ID : <span id="empid"></span>
                </p>
                <p className="label">
                  Tag MAC ID : <span id="tagid"></span>
                </p>
                <p className="label">
                  Mail ID : <span id="mailid"></span>
                </p>
                <p className="label">
                  Phone Number : <span id="phone"></span>
                </p>
                <p className="label">
                  Address : <span id="addr"></span>
                </p>
              </div>
              <br></br>
              <p className="sub-heading">Employee Tracking History</p>
              <table>
                <thead>
                  <tr>
                    <th>Sl. NO.</th>
                    <th>ZONE NAME</th>
                    <th>START TIME</th>
                    <th>END TIME</th>
                    <th>DURATION</th>
                  </tr>
                </thead>
                <tbody id="employeeHistory"></tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EmployeeTrack;
