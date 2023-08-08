import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("https://hooks.adaptable.app/users", user);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <div className="form">
      <h2>Sign up</h2>
      <form  onSubmit={handleSubmit}>
        
        <div className="user-name">
          <label htmlFor="username"> Username:</label>
          <input
            type="text"
            value={user.username}
            id="username"
            onChange={(e) =>
              setUser({ ...user, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="e-mail">
          <label htmlFor="email">E-mail: </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, [e.target.id]: e.target.value })
            }
          />
        </div>
        <div className="pass-word">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, [e.target.id]: e.target.value })
            }
          />
        </div>
        <p>Already have an account? <Link to={"/login"}>
        Log in here.
                  </Link></p>
        

        <p className="error">{error}</p>
        <button className="sign-up"> Sign up</button>
      </form>
    </div>
  );
}

export default SignupPage;
