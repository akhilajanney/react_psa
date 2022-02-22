import React, { Component } from "react";
import "../styling/Header.css";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** Logout from application, navigate to login page.
   *  Clear session data
   */
  logout = () => {
    axios({
      method: "GET",
      url: "/api/logout",
    })
      .then((response) => {
        sessionStorage.clear("isLoggedIn");
        this.props.handleLogin(0);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          sessionStorage.setItem("isLoggedIn", 0);
          this.props.handleLogin(0);
        }
      });
  };

  render() {
    return (
      <header id="header">
        <section>
          <img
            alt=""
            src="../images/Tiles/PSALogo1.png"
            style={{ width: "70px", height: "40px" }}
          />
          <div className="divider"></div>
          <img
            alt=""
            src="../images/Tiles/Logo.png"
            style={{ width: "100px", height: "18px" }}
          />
        </section>
        <section>
          {/* <i
            className="fa fa-user-circle"
            style={{ fontSize: "35px", color: "gray" }}
            title="User"
          ></i> */}
          <i
            className="fa fa-sign-out"
            style={{ fontSize: "35px", color: "black" }}
            title="Sign-out"
            onClick={this.logout}
          ></i>
        </section>
      </header>
    );
  }
}

export default Header;
