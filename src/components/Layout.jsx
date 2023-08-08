import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* <NavBar/> */}

<main>
        <Outlet />
  
</main> 

      <Footer/>
    </>
  );
}

export default Layout;
