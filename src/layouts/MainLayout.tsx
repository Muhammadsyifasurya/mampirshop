import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout: React.FC<{ children: React.ReactNode }> = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
