import { Outlet } from "react-router-dom";
import { HomeNavigation } from "../navigation/Home";

export const MainLayout = ({ isAuthenticated }) => {
  return (
    <>
      <header>
        <div className="logo">
          <span>React router auth</span>
        </div>
        <HomeNavigation isAuthenticated={isAuthenticated} />
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer>&copy; Copyright 2024 All rights reserved.</footer>
    </>
  );
};
