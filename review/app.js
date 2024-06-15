import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";
import PaymentModes from "./components/PaymentModes";
import PaymentDetails from "./components/PaymentDetails";
import PaymentOptions from "./components/PaymentOptions";
import PaymentSuc from "./components/PaymentSuc";
function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getUserData");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoggedIn === "true") {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/payment-modes" element={<PaymentModes />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route
            path="/payment-options"
            element={<PaymentOptions userData={userData} />} />
          <Route path="/Payment-Suc" element={<PaymentSuc />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
