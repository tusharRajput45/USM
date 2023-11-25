import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../style/user-dashboard.css";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";
import DashboardEdit from "./DashboardEdit";
const UserDashbaord = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState();
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
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const result = await response.json();
          setUser(result.data);
          setEmail(result.data.email);
          setMobile(result.data.mobile);
          setName(result.data.name);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
      fetchData();
    } else {
      Navigate("/*");
    }
  }, []);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const SubmitForm = async (e) => {
    e.preventDefault();
    let result = await fetch(`/api/user/edit-user/${user?._id}`, {
      method: "PUT",
      body: JSON.stringify({ name, email, mobile }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.status === "success") {
      alert("succesfully Edit User");
    } else {
      alert(result.message);
    }
  };
  const handleCancel = () => {
    setName("");
    setEmail("");
    setMobile("");
  };
  return (
    <div>
      <div className="">
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
                  <NavLink onClick={logout} className="profile_name">
                    Logout
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="">
                    {user?.name}
                  </NavLink>
                </li>
              </ul>
            </div>
          </figure>
          <figure></figure>
        </section>
      </div>
      <figure>
        <div className="container mt-5 bg-white p-5">
          <form action="" onSubmit={SubmitForm}>
            <div className="row">
              <div className="col">
                <div className="mt-3">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control mt-2"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Mobile</label>
                  <input
                    type="tel"
                    name=""
                    id=""
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-control mt-2"
                    placeholder="Enter Mobile"
                  />
                </div>
              </div>
              <div className="col">
                <div className="mt-3">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control mt-2"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 pb-5">
              <button type="button" className="btn btn-warning float-end me-3">
                Cancel
              </button>
              <button type="submit" className="btn btn-danger float-end me-3">
                Edit
              </button>
            </div>
          </form>
        </div>
      </figure>
    </div>
  );
};

export default UserDashbaord;
