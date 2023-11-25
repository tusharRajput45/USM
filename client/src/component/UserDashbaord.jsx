import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/user-dashboard.css";
import { useNavigate } from "react-router-dom";
import 'react-bootstrap'

const UserDashbaord = () => {
  const Navigate = useNavigate();
  const [user,setUser]=useState()
  const logout = async () => {
    let result = await fetch(`/api/user/logout-user/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.status === "success") {
      alert("succesfully login user");
      Navigate("/");
    } else {
      alert(result.message);
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/user/get-user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const result = await response.json();
          console.log(result.data);
          setUser(result.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
      fetchData();
    }else{
      Navigate('/*')
    }
    
  }, []);
  return (
    <div>
      <div className="nav">
        <section className="dashboard-nav">
          <figure>
            <div className="">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/">Notes</NavLink>
                </li>
                <li>
                  <NavLink to="/">Profile</NavLink>
                </li>
                <li>
                  <NavLink onClick={logout}>Logout</NavLink>
                </li>
                <li className="float-end">
                    {/* <NavLink to="/">{user?.name}</NavLink> */}
                </li>
              </ul>
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
};

export default UserDashbaord;
