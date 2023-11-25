import React from "react";
import { NavLink } from "react-router-dom";
import "../style/navbar.css";

const Home = () => {
  return (
    <div>
      <header className="">
        <nav class="navbar">
          <h2 class="logo">
            <NavLink to="/" className="fs-3 text-uppercase">
              <strong className="text-warning"></strong>{" "}
            </NavLink>
          </h2>
          <input type="checkbox" id="menu-toggler" />
          <label for="menu-toggler" id="hamburger-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="24px"
              height="24px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18V11H3v2zm0-7v2h18V6H3z" />
            </svg>
          </label>
          <ul class="all-links">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="#services">Services</NavLink>
            </li>
            <li>
              <NavLink to="#about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="#contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Sign in</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Home;
