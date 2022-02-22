import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";
import axios from "axios";

class EmployeeRegister extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** On page load calling a method */
  componentDidMount = () => {
    this.employeeTags();
  };

  /** Here api is called to get list of tags available for employee registration */
  employeeTags = () => {
    /* Calling API for employee tags */
    axios({ method: "GET", url: "/api/employee/tags" })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          if (data.length !== 0) {
            $("#tagID").attr("value", data[0].id);
            $("#tagID").val(data[0].tagid);
          } else {
            $("#employeeRegistrationForm").css("display", "none");
            $("#displaymodel").css("display", "block");
            $(".modelcontent").text(
              "No Employee Tag's available for new registration."
            );
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

  /** Registering employees with all details provided */
  registerEmployee = (e) => {
    $("#message").text("");
    $("#message").removeAttr("class");
    let data = {
      tagid: $("#tagID").attr("value"),
      empid: $("#empID").val(),
      empname: $("#empName").val(),
      mailid: $("#mailid").val(),
      phoneno: $("#phNumber").val(),
      dob: $("#dob").val(),
      address: $("#address").val(),
    };
    // Checking whether any field in empty
    if (
      data.empid.length === 0 ||
      data.empname.length === 0 ||
      data.mailid.length === 0 ||
      data.phoneno.length === 0 ||
      data.dob.length === 0 ||
      data.address.length === 0
    ) {
      $("#message").attr("class", "msg error-msg");
      $("#message").text("Please provide all information for Registration.");
    }
    // Validating phone number given by user
    else if (
      data.phoneno.length !== 10 ||
      !data.phoneno.match("[789][0-9]{9}")
    ) {
      $("#message").attr("class", "msg error-msg");
      $("#message").text(
        "Phone number must start with 7-9 and remaining 9 digit with 0-9"
      );
      $("#phNumber").val("");
    }
    // Calling api for employee registration
    else {
      axios.defaults.xsrfHeaderName = "x-csrftoken";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.withCredentials = true;
      e.preventDefault();
      axios({ method: "POST", url: "/api/employee/registration", data: data })
        .then((response) => {
          if (response.status === 201) {
            $("#message").attr("class", "msg success-msg");
            $("#message").text("Employee is Registered successfully.");
            this.employeeTags();
          } else {
            $("#message").attr("class", "msg error-msg");
            $("#message").text("Unable to register employee.");
          }
        })
        .catch((error) => {
          $("#message").attr("class", "msg error-msg");
          if (error.response.status === 500)
            $("#message").text("Internal Server Error.");
          else $("#message").text(error);
        });
      $("#empID").val("");
      $("#empName").val("");
      $("#mailid").val("");
      $("#phNumber").val("");
      $("#dob").val("");
      $("#address").val("");
    }
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Employee - Register</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Register Employee</p>
            <hr></hr>
            <p id="message"></p>
            <form className="main" id="employeeRegistrationForm">
              <fieldset>
                <legend>Employee Details</legend>
                <div className="column-content">
                  <div className="input-group">
                    <label className="label">Tag ID :</label>
                    <input
                      type="text"
                      id="tagID"
                      className="input"
                      autoComplete="off"
                      disabled="disabled"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Employee ID :</label>
                    <input
                      type="text"
                      id="empID"
                      className="input"
                      autoComplete="off"
                      required="required"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Employee Name :</label>
                    <input
                      type="text"
                      id="empName"
                      className="input"
                      autoComplete="off"
                      required="required"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Email ID :</label>
                    <input
                      type="email"
                      id="mailid"
                      className="input"
                      autoComplete="off"
                      required="required"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Phone Number :</label>
                    <input
                      type="tel"
                      id="phNumber"
                      autoComplete="off"
                      className="input"
                      minLength="10"
                      maxLength="10"
                      pattern="[789][0-9]{9}"
                      title="Phone number must start with 7-9 and remaining 9 digit with 0-9"
                      required="required"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">DOB :</label>
                    <input
                      type="date"
                      id="dob"
                      autoComplete="off"
                      className="input"
                      required="required"
                    />
                  </div>
                  <div className="input-group">
                    <label className="label">Address :</label>
                    <input
                      type="text"
                      id="address"
                      autoComplete="off"
                      className="input"
                      required="required"
                    />
                  </div>
                </div>
              </fieldset>

              <div className="input-group">
                <input
                  type="submit"
                  className="btn success-btn btn-green btn-fitcontent "
                  value="Submit"
                  onClick={this.registerEmployee}
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

export default EmployeeRegister;
