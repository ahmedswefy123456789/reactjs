import React from "react";
import { useLogin } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import UsersManager from "./UsersManager";
import NotesManager from "./NotesManager";
import AnalyticsCard from "./AnalyticsCard";
import WeatherCard from "./WeatherCard";

export default function Dashboard() {
  const { logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="header-name"> Manager Panel</h1>
        <button
          onClick={handleLogout}
          className="btn btn-logout"
        >
          Log out
        </button>
      </div>
      <div className="dashboard-cards">
        <UsersManager />
        <NotesManager />
        <AnalyticsCard />
        <WeatherCard />
      </div>
    </div>
  );
} 