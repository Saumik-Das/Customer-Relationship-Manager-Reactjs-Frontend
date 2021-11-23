import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { useState } from "react";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import CustomerState from "./context/customer/CustomerState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <CustomerState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </CustomerState>
    </>
  );
}

export default App;
