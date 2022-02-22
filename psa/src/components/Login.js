import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import "../styling/Login.css";
import "../styling/Styling.css";
import $ from "jquery";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {};
  componentWillUnmount = () => {};

  /** To display and hide login page  */
  displayLogin = () => {
    $("#message").css("display", "none");
    $("#loginPage").css("display", "block");
  };

  /** On Login button click method is called */
  login = (e) => {
    $("#login_error").text("");
    var un = $("#username").val();
    var psw = $("#password").val();
    if (un.length === 0 || psw.length === 0)
      $("#login_error").text("Please provide login details");
    else if (un.match(/\s{1}/) !== null || psw.match(/\s{1}/) !== null)
      $("#login_error").text("Username/Password contains space(s).");
    else {
      axios.defaults.xsrfHeaderName = "x-csrftoken";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.withCredentials = true;
      e.preventDefault();
      axios({
        method: "POST",
        url: "/api/login",
        data: { username: un, password: psw },
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            sessionStorage.setItem("isLoggedIn", 1);
            this.props.handleLogin(1);
          }
        })
        .catch((error) => {
          if (error.response.status === 500)
            $("#login_error").text("Internal Server Error. Please try again.");
          else $("#login_error").text("Request Failed.");
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <header
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3),rgba(255,255,255,0.3)), url(../images/background/LoginBackground.png)",
          }}
        >
          <main>
            <section style={{ marginLeft: "1%" }} id="logo">
              <img
                alt=""
                src="../images/Tiles/PSALogo1.png"
                style={{ width: "150px", height: "80px" }}
              />
              <p>
                Realtime <br></br> Tracking
              </p>
            </section>
            <section id="loginPage">
              <div className="div-content fading" id="loginForm">
                <img
                  alt=""
                  src="../images/Tiles/Logo.png"
                  style={{
                    width: "160px",
                    height: "25px",
                    marginBottom: "40px",
                    display: "block",
                  }}
                />
                <img
                  alt=""
                  src="../images/Tiles/Login.png"
                  style={{
                    width: "135px",
                    height: "56px",
                    marginBottom: "30px",
                    display: "block",
                  }}
                />
                <form>
                  {/* Input field for username */}
                  <div className="input-group">
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      required="required"
                    />
                  </div>
                  {/* Input field for entering password */}
                  <div className="input-group">
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      required="required"
                      autoComplete="off"
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="button"
                      value="Login"
                      className="btn success-btn"
                      onClick={this.login}
                    />
                  </div>
                  <p className="msg error-msg" id="login_error"></p>
                </form>
              </div>
            </section>
          </main>
        </header>
      </Fragment>
    );
  }
}

export default Login;
