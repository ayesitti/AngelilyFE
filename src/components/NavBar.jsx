import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/hooks-high-resolution-logo-color-on-transparent-background (2).png"; 
import { HiUserCircle } from "react-icons/hi";
import { ImHeart } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";


function NavBar({ removeUser }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useLocation();
  console.log(history);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <>
      <nav className="navBar">
        {/* left */}

        <NavLink to={`/`}>
          <img src={logo} className="logo" alt="hookslogo" />
        </NavLink>

        {/* middle */}
    <div>
    <NavLink to={"/favorites"}>
          {" "}
          <div className="favorites-trigger">
            <ImHeart />
           
          </div>
        </NavLink>

        {/* right */}

        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="col">

            <GiHamburgerMenu className="hambIcon"/>
            <HiUserCircle className="userIconNav" />
            </div>
          </div>

    </div>
          {console.log(user)}
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          {user && (
              <h3>Hello, {user && <span> {user.username}</span>}</h3>
            )}
            {!user && (
              <ul className="dropdownItem">
                <Link to={"/login"}>
                  <li>
                    <h2>Log in</h2>
                  </li>
                </Link>
                <Link to={"/signup"}>
                  <li>
                    <h2>Sign up</h2>
                  </li>
                </Link>
              </ul>
            )}
            {user && (
              <ul className="dropdownItem">
                <li>
                  <h2 onClick={removeUser}>Log out</h2>
                </li>
              </ul>
            )}

          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
