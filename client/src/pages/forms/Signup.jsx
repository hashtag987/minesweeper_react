import React from "react";
import "./style.css";
import logger from "./image.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
const Signup = () => {
  const [data, setData] = useState({
    name:"",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/");
			//console.log(res.message);
		} catch (error) {
      console.log(error.response.data.message);
			if (	
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
        generateError(error.response.data.message)
				setError(error.response.data.message);
			}
		}
	};
  return (
    <div className="main">
      <h3 className="logo">MINESWEEPER</h3>
      <div className="box-form">
        <div class="inner-box">
        <img src={logger} class="carousel-signup" />
          <div class="forms-wrap-signup">
            <form onSubmit={handleSubmit}>
              <div class="heading">
                <h2>Become a Miner</h2>
                <h6>Already have an account? </h6>
                <Link to="/" className="toggle">Sign in</Link>
              </div>
              <div class="actual-form">
              <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    required
                  />
                </div>
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
                    
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                  />
                </div>
                <input type="submit" value="Sign Up" class="sign-btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>

  );
};

export default Signup;
