import React, { useState } from "react";
import { NavLink ,useNavigate } from "react-router-dom";


const SingIn = () => {
  const Navigate=useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const SubmitForm = async (e) => {
    e.preventDefault();
    let result = await fetch("/api/user/login-user", {
      method: "POST",
      body: JSON.stringify({email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.status==="success") {
      alert("succesfully login user");
      setEmail("");
      setPassword("");
      Navigate('/user-dashboard')
      localStorage.setItem("token", JSON.stringify(result.token));
    } else {
      alert(result.message);
    }
  };
  return (
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
                  LOGIN
                </button>
              </form>
              <p className="AlreadyRegister">
                New Register Student...?{" "}
                <NavLink to="/signup" className="AlreadyRegister">
                  Sing Up
                </NavLink>
              </p>
            </div>
          </div>
        </section>
    </div>
  );
};

export default SingIn;
