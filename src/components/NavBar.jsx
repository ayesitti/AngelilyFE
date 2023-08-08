import React from "react";
import { Link, useLocation} from "react-router-dom";
import logo from "../assets/hooks-high-resolution-logo-color-on-transparent-background.png";
import { HiUserCircle } from "react-icons/hi";
import { ImHeart } from "react-icons/im";
import { MdLocationSearching } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect, useRef } from "react";
// function DropdownItem() {
//   return (
//     <ul className="dropdownItem">
//       {/* <div>Login</div> */}

//      <Link to={"/login"}><li><h2>Log in</h2></li></Link>
//      <Link to={"/signup"}> <li><h2>Sign up</h2></li>
//       </Link>
//     </ul>
//   );
// }

function NavBar() {
  const history = useLocation()
  console.log(history)
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  return (
    <>
      <nav className="navBar">
        {/* left */}
        <div>
          {" "}
          <Link to={`/`}>
            {" "}
            <img src={logo} className="logo" alt="hookslogo" />
          </Link>
        </div>

        {/* middle */}
        {
          history.pathname === '/' &&
        <div className="search-bar">
          <input type="search" placeholder="Hotel Name" />
          <button className="searchBtn">
            <MdLocationSearching />
          </button>
        </div>
        }
        {/* right */}
        <div className="favorites-trigger">
          <ImHeart />
        </div>
        <div className="menu-container" ref={menuRef}>
          <div
            className="menu-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <GiHamburgerMenu />
            <HiUserCircle />
          </div>
          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <h3>
              Hello, <span>{'User'}</span>
            </h3>

            <ul className="dropdownItem">
              <Link to={"/login"}>
                <li>
                  <h2>Log in</h2>
                </li>
              </Link>
              <Link to={"/signup"}>
                {" "}
                <li>
                  <h2>Sign up</h2>
                </li>
              </Link>
              <li><h2>Log out</h2></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
