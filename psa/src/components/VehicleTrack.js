import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {
  // vehicleDelivey,
  vehicleList,
} from "../paths/urls";
import Chart from "chart.js/auto";

class VehicleTrack extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load getting floormap details like image, width and height and displays it on tracking page.
   *  Calls a method to get all zone details and mark zones on floor map.
   */
  componentDidMount = () => {
    /* Calling floormap API to get floor details. */
    axios({ method: "GET", url: "/api/uploadmap" })
      .then((response) => {

        console.log('Floor=====', response);
        if (response.status === 200) {
          let data = response.data;
          console.log('map',data);
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
            this.serviceZones();
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

    /* Count of vehicle in service center that are service, delivered, average service time and avarage efficiency  */
    axios({ method: "GET", url: "/api/vehicle/details" })
      .then((response) => {
        if (response.status === 200) {
          $("#vehicles_served").text(response.data.total);
          $("#vehicles_delivered").text(response.data.delivered);
          $("#servicetime").text(response.data.servicetime);
          $("#efficiency").text(Math.round(response.data.efficiency) + "%");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    /* Get the count of vehicle that are newly registered, vehicles under service, and total vahicles */
    axios({ method: "GET", url: "/api/service/status" })
      .then((resp) => {
        if (resp.status === 200) {
          $("#new").text(resp.data.new.length);
          $("#running").text(resp.data.running.length);
          $("#totalVehicles").text(
            resp.data.new.length +
              resp.data.running.length +
              resp.data.completed.length
          );
        }
      })
      .catch((error) => {});

    /* Calling API to get the details of vehicles registered and delivered per day and 
        the information is displayed in the form of bar chart */
    // axios({ method: "GET", url: "/api/vehicle/monthlydetails" })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       let dt = [],
    //         carin = [],
    //         carout = [];

    //       if (
    //         response.data.delivred_count.length !== 0 &&
    //         response.data.registered_count.length === 0
    //       ) {
    //         for (let i = 0; i < response.data.delivred_count.length; i++) {
    //           dt[i] = response.data.delivred_count[i].DeliveryDate;
    //           carout[i] = response.data.delivred_count[i].dcount;
    //           carin[i] = 0;
    //         }
    //       } else if (
    //         response.data.delivred_count.length === 0 &&
    //         response.data.registered_count.length !== 0
    //       ) {
    //         for (let i = 0; i < response.data.registered_count.length; i++) {
    //           dt[i] = response.data.registered_count[i].ServiceDate;
    //           carin[i] = response.data.registered_count[i].dcount;
    //           carout[i] = 0;
    //         }
    //       } else if (
    //         response.data.delivred_count.length !== 0 &&
    //         response.data.registered_count.length !== 0
    //       ) {
    //         if (
    //           response.data.delivred_count.length >
    //           response.data.registered_count.length
    //         ) {
    //           for (let i = 0; i < response.data.registered_count.length; i++) {
    //             dt[i] = response.data.delivred_count[i].DeliveryDate;
    //             carout[i] = response.data.delivred_count[i].dcount;
    //             carin[i] = response.data.registered_count[i].dcount;
    //           }
    //           for (
    //             let j =
    //               response.data.delivred_count.length -
    //               response.data.registered_count.length +
    //               1;
    //             j < response.data.delivred_count.length;
    //             j++
    //           ) {
    //             dt[j] = response.data.delivred_count[j].DeliveryDate;
    //             carout[j] = response.data.delivred_count[j].dcount;
    //             carin[j] = 0;
    //           }
    //         } else if (
    //           response.data.delivred_count.length <
    //           response.data.registered_count.length
    //         ) {
    //           for (let i = 0; i < response.data.delivred_count.length; i++) {
    //             dt[i] = response.data.delivred_count[i].DeliveryDate;
    //             carout[i] = response.data.delivred_count[i].dcount;
    //             carin[i] = response.data.registered_count[i].dcount;
    //           }
    //           for (
    //             let j =
    //               response.data.registered_count.length -
    //               response.data.delivred_count.length +
    //               1;
    //             j < response.data.registered_count.length;
    //             j++
    //           ) {
    //             dt[j] = response.data.registered_count[j].DeliveryDate;
    //             carin[j] = response.data.registered_count[j].dcount;
    //             carout[j] = 0;
    //           }
    //         } else {
    //           for (let i = 0; i < response.data.delivred_count.length; i++) {
    //             dt[i] = response.data.delivred_count[i].DeliveryDate;
    //             carout[i] = response.data.delivred_count[i].dcount;
    //             carin[i] = response.data.registered_count[i].dcount;
    //           }
    //         }
    //       }

    //       if ($("#chartCanvas").children().length !== 0)
    //         $("#tempChart").remove();
    //       var cnvs = document.createElement("canvas");
    //       $(cnvs).attr("id", "tempChart");
    //       $(cnvs).attr("width", "25px");
    //       $(cnvs).attr("height", "8px");
    //       $("#chartCanvas").append(cnvs);
    //       const tempChart = $("#tempChart");
    //       new Chart(tempChart, {
    //         type: "bar",
    //         data: {
    //           //Bring in data
    //           labels: dt,
    //           datasets: [
    //             {
    //               label: "Car In",
    //               data: carin,
    //               backgroundColor: "rgba(0, 255, 0 , 0.8)",
    //               barPercentage: 1,
    //               barThickness: 20,
    //               maxBarThickness: 20,
    //             },
    //             {
    //               label: "Car Out",
    //               data: carout,
    //               backgroundColor: "rgba(255, 0, 0 , 0.7)",
    //               barPercentage: 1,
    //               barThickness: 20,
    //               maxBarThickness: 20,
    //               // minBarLength: 2,
    //               // borderColor: "red",
    //               // borderWidth: 2,
    //               // pointRadius: 0.5,
    //               // lineTension: 0.4,
    //             },
    //           ],
    //         },
    //         options: {
    //           responsive: true,
    //           scales: {
    //             y: {
    //               beginAtZero: true,
    //             },
    //           },
    //         },
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /* Hides the error or success message after 3 seconds */
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  /* On component unmount clear the interval set to get vehicle tracking information. */
  componentWillUnmount = () => {
    clearInterval(this.interval_tracking);
  };

  /** Getting list of service zone with their coordinates
   *  and marking the areas on floor map image
   *  Calling tracking method and setting interval for method
   */
  serviceZones = () => {
    axios({ method: "GET", url: "/api/service/zones" })
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            let data = resp.data;
            for (let i in data) {
              if (data[i].zonename !== "InFacility") {
                let div = document.createElement("div");
                $(div).css("position", "absolute");
                $(div).css("left", data[i].x1 * this.px);
                $(div).css("top", data[i].y1 * this.px);
                $(div).css(
                  "padding",
                  ((data[i].y2 - data[i].y1) * this.px) / 2 +
                    "px " +
                    ((data[i].x2 - data[i].x1) * this.px) / 2 +
                    "px"
                );
                $(div).attr("title", data[i].zonename);
                $("#floorDiv").append(div);
              }
            }
            this.trackVehicles();
            this.interval_tracking = setInterval(this.trackVehicles, 1000 * 15);
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
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  /** Getting all vehicle details with x y co ordinates, which are under service
   *  and marking them on floor map image with car number as a title
   */
  trackVehicles = () => {
    $("#message").text("");
    $("#message").removeAttr("class");
    axios({ method: "GET", url: "/api/vehicle/tracking" })
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            let data = resp.data;
            $("#floorDiv").children("i").remove();
            $("#floorDiv").children("p").remove();
            $("#tagID").empty();
            for (let i in data) {
              $("#tagID").append(
                "<option>" + data[i].TagId.tagid + "</option>"
              );
              var vehicle = document.createElement("i");
              $(vehicle).attr("class", "fa fa-car");
              $(vehicle).attr("title", data[i].TagId.tagid);
              $(vehicle).attr("id", data[i].TagId.tagid);
              $(vehicle).on("click", () => {
                this.vehicleServiceHistory(data[i].TagId.id);
                this.getHistory(data[i].TagId.tagid);
              });
              $(vehicle).attr(
                "style",
                "cursor:pointer; font-size:20px; position:absolute; color:black; left:" +
                  (data[i].TagId.x * this.px - 10) +
                  "px; top:" +
                  data[i].TagId.y * this.px +
                  "px;"
              );
              var p = document.createElement("p");
              $(p).text(data[i].CarNumber);
              $(p).attr(
                "style",
                "font-size:11px; font-weight:bold; padding:2px; border:1px solid black; border-radius:5px; position:absolute; color:black; background:white; left:" +
                  (data[i].TagId.x * this.px + 5) +
                  "px; top:" +
                  (data[i].TagId.y * this.px - 15) +
                  "px;"
              );
              $("#floorDiv").append(p);
              $("#floorDiv").append(vehicle);
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

  /** Getting service history of a paricular vehicle, with service details */
  vehicleServiceHistory = (id) => {
    $("#serviceTable").empty();
    $("#history").css("display", "block");
    $("#message").text("");
    $("#message").removeAttr("class");
    axios({
      method: "GET",
      url: "/api/service/servicestatus?id=" + id,
    })
      .then((resp) => {
        if (resp.status === 200) {
          if (resp.data.length !== 0) {
            let data = resp.data;

            let sl = 1;
            $("#name").text(resp.data[0].tagdata.CustomerName);
            $("#mailid").text(resp.data[0].tagdata.MailID);
            $("#phone").text(resp.data[0].tagdata.PhoneNumber);
            $("#addr").text(resp.data[0].tagdata.Address);
            $("#car").text(resp.data[0].tagdata.CarNumber);

            for (let i in data) {
              for (let j in data[i].servicedata) {
                let startTime = "--:--:--",
                  endTime = "--:--:--",
                  duration = "--:--:--";
                if (
                  data[i].servicedata[j].data.starttime.substr(0, 10) !==
                  "1947-07-15"
                ) {
                  startTime =
                    data[i].servicedata[j].data.starttime.substr(0, 10) +
                    " " +
                    data[i].servicedata[j].data.starttime
                      .substr(11, 18)
                      .split(".")[0];
                  endTime =
                    data[i].servicedata[j].data.endtime.substr(0, 10) +
                    " " +
                    data[i].servicedata[j].data.endtime
                      .substr(11, 18)
                      .split(".")[0];
                  let diff = (new Date(endTime) - new Date(startTime)) / 1000;
                  let hh = Math.floor(diff / 3600);
                  if (hh < 10) hh = "0" + hh;
                  let mm = Math.floor((diff % 3600) / 60);
                  if (mm < 10) mm = "0" + mm;
                  let ss = Math.floor((diff % 3600) % 60);
                  if (ss < 10) ss = "0" + ss;
                  duration = hh + ":" + mm + ":" + ss;
                }
                $("#serviceTable").append(
                  "<tr><td>" +
                    sl +
                    "</td><td>" +
                    data[i].tagdata.TagId.tagid +
                    "</td><td>" +
                    data[i].servicedata[j].name +
                    "</td><td>" +
                    startTime +
                    "</td><td>" +
                    endTime +
                    "</td><td>" +
                    duration +
                    "</td><td>" +
                    data[i].servicedata[j].data.status +
                    "</td></tr>"
                );
                sl = sl + 1;
              }
            }
            $("#demo").scrollTop(500);
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

  /** Getting zone wise movement history of a particular vehicle */
  getHistory = (tagID) => {
    $("#serviceHistory").empty();
    $("#message").text("");
    $("#message").removeAttr("class");
    axios.defaults.xsrfHeaderName = "x-csrftoken";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;
    axios({
      method: "POST",
      url: "/api/service/history",
      data: { tagid: tagID },
    })
      .then((response) => {
        if (response.status === 200) {
          // $("#name").text(response.data.vehicle.CustomerName);
          // $("#mailid").text(response.data.vehicle.MailID);
          // $("#phone").text(response.data.vehicle.PhoneNumber);
          // $("#addr").text(response.data.vehicle.Address);
          // $("#car").text(response.data.vehicle.CarNumber);
          if (
            response.data.history !== undefined &&
            response.data.history.length !== 0
          ) {
            let data = response.data.history;
            let h = { starttime: "", endtime: "", zonename: "" };
            h.starttime = data[0].timestamp;
            h.zonename = data[0].zonename;
            let sl = 1;
            for (let i = 1; i < data.length; i++) {
              if (data[i].zonename === h.zonename) {
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
                $("#serviceHistory").append(
                  "<tr><td>" +
                    sl +
                    "</td><td>" +
                    tagID +
                    "</td><td>" +
                    h.zonename +
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
                h.zonename = data[i].zonename;
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

            $("#serviceHistory").append(
              "<tr><td>" +
                sl +
                "</td><td>" +
                tagID +
                "</td><td>" +
                h.zonename +
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
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  /** Locating particular vehicle on floor map image based on search tag id */
  searchTag = () => {
    $("#floorDiv").children("i").css("display", "none");
    $("#floorDiv").children("p").css("display", "none");
    $("#" + $("#tagID").val()).css("display", "block");
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Vehicle - Realtime Tracking</title>
        </Helmet>
        <div className="container" id="demo">
          <div className="main" style={{ position: "relative" }}>
            <p className="heading">Realtime Tracking</p>
            {/* <form>
              <select
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
            </form> */}
            <p id="message"></p>
            <hr></hr>
            <br></br>
            <div id="summary_block">
              <h2 style={{ color: "#444444" }}>Summary</h2>
              <hr></hr>
              <div className="content">
                <div className="content-section">
                  <p>Total Vehicles Served</p>
                  <p id="vehicles_served">0</p>
                </div>
                {/* <div className="divider"></div> */}
                <Link to='/details'
                  style={{textDecoration:'none'}}
                >
                <div className="content-section"
                  style={{ cursor: "pointer" }}
                  // onClick={window.location.pathname='/details'}
                >
                  <p style={{color:'black'}}>Vehicles Delivered till Today</p>
                  <p
                    id="vehicles_delivered"
                    style={{ color: "rgb(0, 135, 117)" }}
                  >
                    0
                  </p>
                </div>
                </Link>

                {/* <div className="divider"></div> */}
                <div className="content-section">
                  <p>Average Service Time</p>
                  <p id="servicetime" style={{ color: "rgb(0, 135, 117)" }}>
                    0
                  </p>
                </div>
                {/* <div className="divider"></div> */}
                <div className="content-section">
                  <p>Average Efficiency</p>
                  <p id="efficiency" style={{ color: "rgb(0, 135, 117)" }}>
                    0
                  </p>
                </div>
              </div>
              <hr></hr>
              <h2 style={{ color: "#444444" }}>Current Day Updates</h2>
              <hr></hr>
              <div className="content">
                <div
                  className="content-section"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    $("#summary_block").css("display", "none");
                    $("#image_block").css("display", "block");
                    $("#message").attr("class", "msg success-msg");
                    $("#message").text(
                      "You can track vehicles in the service center."
                    );
                  }}
                >
                  <p>Number of vehicles currently in Shop</p>
                  <p id="totalVehicles"></p>
                </div>
                {/* <div className="divider"></div> */}
                <div
                  className="content-section"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.pathname = vehicleList;
                  }}
                >
                  <p>Vehicles under Service</p>
                  <p id="running" style={{ color: "#fc3b3b" }}></p>
                </div>
                {/* <div className="divider"></div> */}
                <div
                  className="content-section"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.pathname = vehicleList;
                  }}
                >
                  <p>Vehicles waiting for Service</p>
                  <p id="new" style={{ color: "#fc3b3b" }}></p>
                </div>
                {/* {/* <div className="divider"></div> */}
                {/* <div className="content-section">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.pathname = empReport;
                }}
              >
                Number of Employees in Centre :
              </p>
              <p id="totalEmployees">0</p>
            </div> */}
              </div>

              {/* Block to display the data in bar chart */}
              <hr></hr>
              <h2 style={{ color: "#444444" }}>Vehicle Delivery Report</h2>
              <hr></hr>
              <div className="content" id="chartCanvas"></div>
            </div>
            {/* Block for displaying floor map image and vehicle trakcing
             and displays sservice history of the vehicles */}

            <div id="image_block" style={{ display: "none" }}>
              <div id="floorDiv"></div>
              <div id="history" style={{ display: "none", marginTop: "20px" }}>
                <div className="card">
                  <p className="label">
                    Customer Name : <span id="name"></span>
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
                  <p className="label">
                    Car Number : <span id="car"></span>
                  </p>
                </div>
                <br></br>
                <p className="sub-heading">Vehicle Service Details</p>
                <table>
                  <thead>
                    <tr>
                      <th>Sl. NO.</th>
                      <th>TAG ID</th>
                      <th>SERVICE NAME</th>
                      <th>START TIME</th>
                      <th>END TIME</th>
                      <th>SERVICE DURATION</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody id="serviceTable"></tbody>
                </table>
                <p className="sub-heading">Vehicle Service History</p>
                <table>
                  <thead>
                    <tr>
                      <th>Sl. NO.</th>
                      <th>TAG ID</th>
                      <th>SERVICE NAME</th>
                      <th>START TIME</th>
                      <th>END TIME</th>
                      <th>SERVICE DURATION</th>
                      {/* <th>STATUS</th> */}
                    </tr>
                  </thead>
                  <tbody id="serviceHistory"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleTrack;
