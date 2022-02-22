import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import axios from "axios";

axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

class VehicleRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load calling method for random number genertion and vehicle tag list */
  componentDidMount = () => {
    $("#message").attr("class", "msg success-msg");
    $("#message").text(
      "Register a car for service by providing all details..."
    );
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 2);
    this.generateRegNumber();
    // this.vehicleTags();
  };

  /** Generate an unique random number as registration number for vehicle service registration */
  generateRegNumber = () => {
    let dt = new Date();
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let key = dt.getFullYear() + "-";
    if (parseInt(dt.getMonth()) + 1 < 10)
      key += "0" + (parseInt(dt.getMonth()) + 1) + "-";
    else key += parseInt(dt.getMonth()) + 1 + "-";
    if (dt.getDate() < 10) key += "0" + dt.getDate() + "-";
    else key += dt.getDate() + "-";
    key += result;
    $("#serviceNumber").val(key);

    for (let i = 1; i <= 16; i++) $("#Service" + i).attr("value", "No");
  };

  /* Get Unregistered tag list for vehicle registration */
  // vehicleTags = () => {
  //   axios({ method: "GET", url: "/api/vehicle/tags" })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         let data = response.data;
  //         if (data.length !== 0) {
  //           $("#tagID").attr("value", data[0].id);
  //           $("#tagID").val(data[0].tagid);
  //           $("#tagID").css("display", "block");
  //           this.employeeList();
  //         } else {
  //           $("#serviceRegistrationForm").css("display", "none");
  //           $("#displaymodel").css("display", "block");
  //           $(".modelcontent").text(
  //             "No Vehicle Tag ID's available for new registration."
  //           );
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       $("#serviceRegistrationForm").css("display", "none");
  //       $("#message").attr("class", "msg error-msg");
  //       if (error.response.status === 500)
  //         $("#message").text("Internal Server Error.");
  //       else $("#message").text(error);
  //     });
  // };

  /** Get list of already registered employee
   *  Is added in drop down list
   */
  // employeeList = () => {
  //   $("#message").text("");
  //   $("#message").removeAttr("class");
  //   axios({ method: "GET", url: "/api/employee/registration" })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         if (response.data.length !== 0) {
  //           let data = response.data;
  //           for (let i in data) {
  //             $("#serviceReceivedBy").append(
  //               "<option value=" +
  //                 data[i].id +
  //                 ">" +
  //                 data[i].empname +
  //                 "</option>"
  //             );
  //           }
  //         } else {
  //           $("#displaymodel").css("display", "block");
  //           $(".modelcontent").text("Please register an Employee first.");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       $("#serviceRegistrationForm").css("display", "none");
  //       $("#message").attr("class", "msg error-msg");
  //       if (error.response.status === 500)
  //         $("#message").text("Internal Server Error.");
  //       else $("#message").text(error);
  //     });
  // };

  /** Service list updation based on selected option */
  checkService = (service) => {
    if ($("#" + service).is(":checked")) {
      $("#" + service).attr("value", "Yes");
    } else $("#" + service).attr("value", "No");
  };

  /** Register a vehicle for service with all details provided by customer with service list */
  registerVehicle = (e) => {
    $("#message").text("");
    $("#message").removeAttr("class");
    let data = {
      id: $("#tagID").val(),
      name: $("#customeName").val(),
      mailid: $("#mailid").val(),
      phonenumber: $("#phNumber").val(),
      address: $("#address").val(),
      carnumber: $("#carNumber").val(),
      carcolor: $("#carColor").val(),
      fuellevel: $("#fuelLevel").val(),
      odometer: $("#odoMeter").val(),
      servicenumber: $("#serviceNumber").val(),
      // servicereceivedby: $("#serviceReceivedBy").val(),
      status: "New",
      Service1: $("#Service1").attr("value"),
      Service2: $("#Service2").attr("value"),
      Service3: $("#Service3").attr("value"),
      Service4: $("#Service4").attr("value"),
      Service5: $("#Service5").attr("value"),
      Service6: $("#Service6").attr("value"),
      Service7: $("#Service7").attr("value"),
      Service8: $("#Service8").attr("value"),
      Service9: $("#Service9").attr("value"),
      Service10: $("#Service10").attr("value"),
      Service11: $("#Service11").attr("value"),
      Service12: $("#Service12").attr("value"),
      Service13: $("#Service13").attr("value"),
      Service14: $("#Service14").attr("value"),
      Service15: $("#Service15").attr("value"),
      Service16: $("#Service16").attr("value"),
    };

    console.log("===============>",data);
    if (
      data.name.length === 0 ||
      data.mailid.length === 0 ||
      data.phonenumber.length === 0 ||
      data.address.length === 0 ||
      data.carnumber.length === 0 ||
      data.carcolor.length === 0 ||
      data.odometer.length === 0
    ) {
      $("#message").attr("class", "msg error-msg");
      $("#message").text("Please provide all information for Registration.");
    } else if (
      data.phonenumber.length !== 10 ||
      !data.phonenumber.match("[789][0-9]{9}")
    ) {
      $("#message").attr("class", "msg error-msg");
      $("#message").text(
        "Phone number must start with 7-9 and remaining 9 digit with 0-9"
      );
      $("#phNumber").val("");
    } else if (
      $("#Service1").attr("value") === "No" &&
      $("#Service2").attr("value") === "No" &&
      $("#Service3").attr("value") === "No" &&
      $("#Service4").attr("value") === "No" &&
      $("#Service5").attr("value") === "No" &&
      $("#Service6").attr("value") === "No" &&
      $("#Service7").attr("value") === "No" &&
      $("#Service8").attr("value") === "No" &&
      $("#Service9").attr("value") === "No" &&
      $("#Service10").attr("value") === "No" &&
      $("#Service11").attr("value") === "No" &&
      $("#Service12").attr("value") === "No" &&
      $("#Service13").attr("value") === "No" &&
      $("#Service14").attr("value") === "No" &&
      $("#Service15").attr("value") === "No" &&
      $("#Service16").attr("value") === "No"    

    ) {
      $("#message").attr("class", "msg error-msg");
      $("#message").text(
        "No service is selected for the Vehicle. Please select atleast one."
      );
    } else {
      e.preventDefault();
      axios({ method: "POST", url: "/api/service/registration", data: data })
        .then((response) => {
          if (response.status === 201) {
            // window.scrollTo(0, 0);
            $("#message").attr("class", "msg success-msg");
            $("#message").text(
              "Vehicle is registered for service successsfully."
            );
            $("#tagID").val("");
            $("#customeName").val("");
            $("#mailid").val("");
            $("#phNumber").val("");
            $("#address").val("");
            $("#carNumber").val("");
            $("#carColor").val("");
            $("#fuelLevel").val();
            $("#odoMeter").val("");
            $("#Service1").prop("checked", false);
            $("#Service2").prop("checked", false);
            $("#Service3").prop("checked", false);
            $("#Service4").prop("checked", false);
            $("#Service5").prop("checked", false);
            $("#Service6").prop("checked", false);
            $("#Service7").prop("checked", false);
            $("#Service8").prop("checked", false);
            $("#Service9").prop("checked", false);
            $("#Service10").prop("checked", false);
            $("#Service11").prop("checked", false);
            $("#Service12").prop("checked", false);
            $("#Service13").prop("checked", false);
            $("#Service14").prop("checked", false);
            $("#Service15").prop("checked", false);
            $("#Service16").prop("checked", false);
            // setTimeout(window.location.reload(), 1000);
            this.generateRegNumber();
            // this.vehicleTags();
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("Unable to register vehicle for service.");
          }
        })
        .catch((error) => {
          $("#message").attr("class", "msg error-msg");
          if (error.response.status === 500)
            $("#message").text("Internal Server Error.");
          else if (error.response.status === 400)
            $("#message").text("Tag MAC ID entered might be invalid.");
          else if (error.response.status === 406)
            $("#message").text("Tag is already assigned for a car.");
          else $("#message").text(error);
        });
    }
    setTimeout(() => {
      $("#message").text("");
    }, 1000 * 3);
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Vehicle - Register/Unregister</title>
        </Helmet>
        <div className="container">
          <div className="main" style={{ position: "relative" }}>
            <p className="heading">Register New Car for Service</p>
            {/* <form>
              <input
                type="text"
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                  color: "white",
                }}
                // className="btn btn-fitcontent btn-green"
                className="input"
                id="tagID"
                placeholder="Enter Tag MAC ID"
              />
            </form>
            <hr></hr> */}
            <br></br>
            <p id="message"></p>
            <form className="main" id="serviceRegistrationForm">
              <fieldset>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Tag MAC ID :</label>
                    <input
                      type="text"
                      id="tagID"
                      className="input"
                      required="required"
                    />
                  </div>
                </div>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Service Register Number :</label>
                    <input
                      type="text"
                      id="serviceNumber"
                      className="input"
                      required="required"
                      autoComplete="off"
                      disabled="disabled"
                    />
                  </div>
                </div>
                {/* <div className="column-content">
                  <div className="input-group">
                    <label className="label">Service Received By :</label>
                    <select
                      type="text"
                      id="serviceReceivedBy"
                      className="input"
                      required="required"
                      style={{ paddingTop: "2px" }}
                    ></select>
                  </div>
                </div> */}
              </fieldset>
              <fieldset>
                <legend>Customer Details</legend>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Customer Name :</label>
                    <input
                      type="text"
                      id="customeName"
                      className="input"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Email ID :</label>
                    <input
                      type="email"
                      id="mailid"
                      className="input"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Phone Number :</label>
                    <input
                      type="tel"
                      id="phNumber"
                      required="required"
                      autoComplete="off"
                      className="input"
                      minLength="10"
                      maxLength="10"
                      pattern="[789][0-9]{9}"
                      title="Phone number must start with 7-9 and remaining 9 digit with 0-9"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Address :</label>
                    <input
                      type="text"
                      id="address"
                      required="required"
                      autoComplete="off"
                      className="input"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend>Vehicle Details</legend>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Car Number :</label>
                    <input
                      type="text"
                      id="carNumber"
                      className="input"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Car Color :</label>
                    <input
                      type="text"
                      id="carColor"
                      className="input"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Fuel Level :</label>
                    <input
                      type="range"
                      id="fuelLevel"
                      min="0"
                      max="100"
                      className="input"
                      required="required"
                      autoComplete="off"
                      onInput={() => {
                        $("#fuelValue").text($("#fuelLevel").val() + "%");
                      }}
                    />
                    <span id="fuelValue">50%</span>
                  </div>
                  <div className="input-group">
                    <label className="label">Odo Meter (km) :</label>
                    <input
                      type="number"
                      id="odoMeter"
                      min="0"
                      className="input"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend>Service Details</legend>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">PDI :</label>
                    <input
                      type="checkbox"
                      id="Service1"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service1");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label"> 1st Free Service :</label>
                    <input
                      type="checkbox"
                      id="Service2"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service2");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">2nd Free Service :</label>
                    <input
                      type="checkbox"
                      id="Service3"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service3");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">3rd Free Service :</label>
                    <input
                      type="checkbox"
                      id="Service4"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service4");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Periodic Maintenance Service :</label>
                    <input
                      type="checkbox"
                      id="Service5"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service5");
                      }}
                    />
                  </div>
                </div>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Wheel Alignment :</label>
                    <input
                      type="checkbox"
                      id="Service6"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service6");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Wheel Balancing :</label>
                    <input
                      type="checkbox"
                      id="Service7"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service7");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Washing & Cleaning :</label>
                    <input
                      type="checkbox"
                      id="Service8"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service8");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Tinkering Work :</label>
                    <input
                      type="checkbox"
                      id="Service9"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service9");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Painting Work :</label>
                    <input
                      type="checkbox"
                      id="Service10"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service10");
                      }}
                    />
                  </div>
                </div>


                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Polishing Work :</label>
                    <input
                      type="checkbox"
                      id="Service11"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service11");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Interior Enrichment :</label>
                    <input
                      type="checkbox"
                      id="Service12"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service12");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Surface Refinement :</label>
                    <input
                      type="checkbox"
                      id="Service13"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service13");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Exterior Beautification :</label>
                    <input
                      type="checkbox"
                      id="Service14"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service14");
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Under Chassis Painting :</label>
                    <input
                      type="checkbox"
                      id="Service15"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                      onClick={() => {
                        this.checkService("Service15");
                      }}
                    />
                  </div>
                </div>
                <div className="column-content">
                <div className="input-group"
                  style={{position:'relative',bottom:'173px'}}
                >
                    <label className="label">Silencer Coating :</label>
                    <input
                      type="checkbox"
                      id="Service16"
                      className="checkbox"
                      required="required"
                      autoComplete="off"
                    
                      onClick={() => {
                        this.checkService("Service16");
                      }}
                      style={{marginTop:'8px'}}
                    />
                  </div> 
                  </div>
              
              </fieldset>

              <div className="input-group">
                <input
                  type="submit"
                  className="btn success-btn btn-green btn-fitcontent "
                  value="Submit"
                  onClick={this.registerVehicle}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="model" id="displaymodel">
          <div className="modelbox">
            <p className="modelcontent">error message</p>
            <button
              className="modelbtn"
              id="modelBtn"
              onClick={() => {
                window.location.pathname = "/home";
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleRegister;
