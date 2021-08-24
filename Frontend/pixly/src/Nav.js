import React from "react";
import { Link, NavLink } from "react-router-dom";


function Nav() {
  return (

    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Pixly
      </Link>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/add-image">
            Add Image
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;