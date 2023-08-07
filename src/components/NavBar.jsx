import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/hooks-high-resolution-logo-color-on-transparent-background.png";
import { HiUserCircle } from "react-icons/hi";
import { GrFavorite } from "react-icons/gr";
import { MdLocationSearching } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
function NavBar() {
  return (
    <>
      <nav className="navBar">
        {/* left */}
        <img src={logo} className="logo" alt="hookslogo" />
        {/* middle */}
        <div className="search-bar">
          <input type="search" placeholder="Hotel Name" />
          <button className="searchBtn">
            <MdLocationSearching />
          </button>
        </div>
        {/* right */}
        <div className="profile-container">
        <Link to={`/`}>
          {/* <img src="./public/70083.png" alt=""  style={{ width: "3rem" }}/> */}
          <div>
            <AiTwotoneHome />
          </div>
        </Link>
        <div>
          <GrFavorite />
        </div>
        <div>
          <HiUserCircle />
        </div>
        </div>
      </nav>
  
    </>
  );
}

export default NavBar;
