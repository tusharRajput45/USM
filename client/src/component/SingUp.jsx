import React, { useState } from "react";
import "../style/signup.css";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate=useNavigate()
  const [lastname, setLastName] = useState();
  const [firstname, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();


  const SubmitForm = async (e) => {
    e.preventDefault();
    let result = await fetch("/api/user/user-register", {
      method: "POST",
      body: JSON.stringify({ lastname, firstname, email, mobile, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.status==="success") {
      alert("Data saved succesfully ...! Varify Email and Mobile");
      setLastName("");
      setFirstName("");
      setEmail("");
      setMobile("");
      setPassword("");
      Navigate('/user-dashboard')
    } else {
      alert(result.message);
    }
  };
  return (
    <div>
      <div>
        <section id="registration-page">
          <div id="container">
            <div className="form-box">
              <form
                className="c-form"
                name="c-form"
                onSubmit={SubmitForm}
                method="post"
                autoComplete="off"
              >
                <div className="two-columns">
                  <fieldset>
                    <label className="c-form-label" for="last-name">
                      Last name<span className="c-form-required"> *</span>
                    </label>
                    <input
                      id="last-name"
                      className="c-form-input"
                      type="text"
                      name="lastname"
                      placeholder="Your last name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastname}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label className="c-form-label" for="first-name">
                      First name<span className="c-form-required"> *</span>
                    </label>
                    <input
                      id="first-name"
                      className="c-form-input"
                      type="text"
                      name="firstname"
                      placeholder="Your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstname}
                      required
                    />
                  </fieldset>
                </div>

                <fieldset>
                  <label className="c-form-label" for="email">
                    Email address<span className="c-form-required"> *</span>
                  </label>
                  <input
                    id="email"
                    className="c-form-input"
                    type="email"
                    name="email"
                    placeholder="Email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>

                <fieldset>
                  <label className="c-form-label" for="mobile">
                    Mobile<span className="c-form-required"> *</span>
                  </label>
                  <input
                    id="subject"
                    className="c-form-input"
                    type="text"
                    name="mobile"
                    minLength={10}
                    maxLength={10}
                    placeholder="Enter Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="c-form-label" for="mobile">
                    Password<span className="c-form-required"> *</span>
                  </label> 
                  <input
                    id="subject"
                    className="c-form-input"
                    type="password"
                    name="password"
                    minLength={6}
                    maxLength={10}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </fieldset>
              
                <button className="c-form-btn" type="submit">
                  SUBMIT
                </button>
              </form>
              <p className="AlreadyRegister">
                Already Register Student...?{" "}
                <NavLink to="/signin" className="AlreadyRegister">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
