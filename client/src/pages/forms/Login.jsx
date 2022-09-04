import React from "react";
import "./style.css";
import logger from "./image.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      //localStorage.setItem("token", res.data);
      //window.location = "/";
      console.log(res.name)
      navigate("/board");
    } catch (error) {
      console.log(error.response.data.message);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="main">
      <h3 className="logo">MINESWEEPER</h3>
      <div className="box-form">
        <div className="inner-box">
          <img src={logger} className="carousel-login" />
          <div className="forms-wrap-login">
            <form onSubmit={handleSubmit}>
              <div className="heading">
                <h2>Hello there, Miner</h2>
                <h6>Not registred yet? </h6>
                <Link to="/signup" className="toggle">
                  Sign up
                </Link>
              </div>
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                  />
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    className="input-field"
                    autoComplete="off"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                  />
                </div>
                <input type="submit" value="Sign In" className="sign-btn" />
              </div>
            </form>
            {/* <img src={logger} className="carousel-login"/> */}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
