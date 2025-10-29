import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginProvider, useLogin } from "./LoginContext";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import UserDetails from "./UserDetails";



function PrivateRoute({ children }) {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {
  return (
  
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;