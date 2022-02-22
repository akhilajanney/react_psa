import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Digital from "./components/Digital";
import EmployeeAlert from "./components/EmployeeAlert";
import EmployeeAttendance from "./components/EmployeeAttendance";
import EmployeeList from "./components/EmployeeList";
import EmployeeRegister from "./components/EmployeeRegister";
import EmployeeReport from "./components/EmployeeReport";
import EmployeeTrack from "./components/EmployeeTrack";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import SystemHealth from "./components/SystemHealth";
import Vehicle from "./components/Vehicle";
import VehicleAlert from "./components/VehicleAlert";
import VehicleDeliver from "./components/VehicleDeliver";
import VehicleList from "./components/VehicleList";
import VehicleRegister from "./components/VehicleRegister";
import VehicleReport from "./components/VehicleReport";
import VehicleTrack from "./components/VehicleTrack";
import Vehicledelivered from "./components/Vehicledelivered";
import {
  login,
  home,
  vehicleRegistration,
  vehicleRegisterOption,
  vehicleDelivey,
  vehicleTracking,
  serviceAlert,
  serviceReport,
  vehicleList,
  empRegister,
  empReport,
  empAttendance,
  empTracking,
  empAlerts,
  empList,
  systemHealth,
} from "./paths/urls";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: parseInt(0) };
  }

  componentDidMount = () => {};

  /** Method to change state */
  handleUserLogin = (credentials) => {
    this.setState({ isLoggedIn: parseInt(credentials) });
  };

  render() {
    if (parseInt(sessionStorage.getItem("isLoggedIn")) === 1) {
      return (
        <Router>
          <Header handleLogin={this.handleUserLogin}></Header>
          <Sidebar></Sidebar>
          <Digital></Digital>
          <Switch>
            <Route exact path="/">
              <Redirect to={home}></Redirect>
            </Route>
            <Route exact path={login}>
              <Redirect to={home}></Redirect>
            </Route>
            <Route exact path={home} component={Home} />
            <Route exact path={vehicleRegisterOption} component={Vehicle} />
            <Route
              exact
              path={vehicleRegistration}
              component={VehicleRegister}
            />
            <Route exact path={vehicleDelivey} component={VehicleDeliver} />
            <Route exact path={serviceReport} component={VehicleReport} />
            <Route exact path={vehicleTracking} component={VehicleTrack} />
            <Route exact path={serviceAlert} component={VehicleAlert} />
            <Route exact path={vehicleList} component={VehicleList} />
            <Route exact path={empRegister} component={EmployeeRegister} />
            <Route exact path={empReport} component={EmployeeReport} />
            <Route exact path={empAttendance} component={EmployeeAttendance} />
            <Route exact path={empTracking} component={EmployeeTrack} />
            <Route exact path={empAlerts} component={EmployeeAlert} />
            <Route exact path={empList} component={EmployeeList} />
            <Route exact path={systemHealth} component={SystemHealth} />
            <Route exact path='/details' component={Vehicledelivered} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Route path="/">
            <Redirect to={login}></Redirect>
          </Route>
          <Route
            exact
            path={login}
            render={(props) => (
              <Login
                title="Login"
                {...props}
                handleLogin={this.handleUserLogin}
              ></Login>
            )}
          />
        </Router>
      );
    }
  }
}

export default App;
