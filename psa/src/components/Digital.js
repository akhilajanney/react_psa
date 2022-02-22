import React, { PureComponent } from "react";
import $ from "jquery";
import "../styling/Digital.css";
import axios from "axios";

const month = [
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

class Digital extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    // this.formatAMPM = this.formatAMPM.bind(this);
  }

  /* On home page load data and time are displayed */
  componentDidMount = () => {
    // var date = new Date();
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // var ampm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    // var strTime = hours + ":" + minutes + " " + ampm;
    // $("#time").text(strTime);

    // this.interval = setInterval(this.formatAMPM, 1000 * 60);
    this.latestUpdate();
    this.interval = setInterval(this.latestUpdate, 1000 * 60);
  };

  latestUpdate = () => {
    axios({ method: "GET", url: "/api/masterhealth" })
      .then((response) => {
          console.log('digital',response)
        if (response.status === 200) {
          if (response.data.length !== 0) {
            let data = response.data[0].lastseen;
            $("#date").text(
              data.substr(8, 2) +
                " " +
                month[parseInt(data.substr(5, 2)) - 1] +
                " " +
                data.substr(0, 4)
            );
            var hours = data.substr(11, 2);
            var minutes = data.substr(14, 2);
            var ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            hours = hours < 10 ? "0" + hours : hours;
            var strTime = hours + ":" + minutes + " " + ampm;
            $("#time").text(strTime);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* Updates timing displayed on home page each minute */
  // formatAMPM = () => {
  //   var date = new Date();
  //   var hours = date.getHours();
  //   var minutes = date.getMinutes();
  //   var ampm = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12;
  //   hours = hours ? hours : 12; // the hour '0' should be '12'
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   var strTime = hours + ":" + minutes + " " + ampm;
  //   $("#time").text(strTime + " ");
  // };

  componentWillUnmount = () => {
    // clearInterval(this.interval);
    clearInterval(this.latestUpdate);
  };

  render() {
    return (
      <div className="timeblock">
        <div className="timeStyle">
          <span id="time"></span>
          <div className="divider"></div>
          <span id="date"></span>
        </div>
      </div>
    );
  }
}

export default Digital;
