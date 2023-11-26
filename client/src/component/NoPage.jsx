import React from "react";
import { NavLink } from "react-router-dom";

const NoPage = () => {
  return (
    <div>
      <div className="not_found">
        <h1 className="text-center mt-5 pt-5">404 Page not found</h1>
        <p className="mt-3 text-center">
          <NavLink to="/">Back to Home</NavLink>
        </p>
      </div>
    </div>
  );
};

export default NoPage;
