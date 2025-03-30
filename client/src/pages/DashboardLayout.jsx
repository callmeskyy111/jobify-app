import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardWrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { checkDefaultTheme } from "../App";

const DashboardCtxt = createContext(); // setting up the context

function DashboardLayout() {
  //temp val.
  const user = { name: "Skyy" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  function toggleDarkTheme() {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser() {
    console.log("logoutUser fx() ✔️");
  }

  return (
    <DashboardCtxt.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}>
      <DashboardWrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </DashboardWrapper>
    </DashboardCtxt.Provider>
  );
}
export function useDashboardCtxt() {
  return useContext(DashboardCtxt);
}
export default DashboardLayout;
