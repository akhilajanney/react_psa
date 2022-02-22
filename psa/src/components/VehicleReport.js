import axios from "axios";
import React, { Fragment, PureComponent } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";

class VehicleReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    axios({ method: "", url: "" })
      .then((response) => {
        if (response.status === 200) {
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
          <title>Vehicle - Service Report</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <p className="heading">Service Report</p>
            <hr></hr>
            <p id="message"></p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default VehicleReport;
