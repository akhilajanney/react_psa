import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { vehicleDelivey, vehicleRegistration } from "../paths/urls";

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Service Options</title>
        </Helmet>
        <div className="container">
          <div className="main">
            <div className="row">
              <div className="col-3">
                <Link to={vehicleRegistration}>
                  <img
                    alt=""
                    src="../images/widgets/NewCarInWidget.png"
                    style={{
                      width: "100%",
                      height: "340px",
                      cursor: "pointer",
                    }}
                  ></img>
                </Link>
              </div>
              <div className="col-3">
                <Link to={vehicleDelivey}>
                  <img
                    alt=""
                    src="../images/widgets/DeliverServicedCarWidget.png"
                    style={{
                      width: "100%",
                      height: "340px",
                      cursor: "pointer",
                    }}
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Vehicle;
