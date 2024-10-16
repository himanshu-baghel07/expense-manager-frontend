import React, { useState } from "react";
import "./Onboarding.css";
import bgImage from "../../assets/background_vector.svg";
import eyeOpen from "../../assets/eye_open.svg";
import eyeClose from "../../assets/eye_close.svg";
import axios from "axios";
import URI from "../../common";
import * as CryptoJS from "crypto-js";
import { emailValidation } from "../../common/commonComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "../../common/redux/UserSlice";

const Onboarding = () => {
  const [selectedAction, setselectedAction] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigateTo = useNavigate();

  const dispatchTo = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const encryptedPayload = (requestBody) => {
    let encryptedRequestBody;
    const requestBodyString = JSON.stringify(requestBody);
    encryptedRequestBody = CryptoJS.AES.encrypt(
      requestBodyString,
      "hello0"
    ).toString();
    return encryptedRequestBody;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let encryptedRequestBody;
    const __reqBody = {
      username: formData.username,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
    encryptedRequestBody = encryptedPayload(__reqBody);
    try {
      const response = await axios.post(URI.register, {
        encryptedRequestBody: encryptedRequestBody,
      });
      if (response.status === 201) {
        setFormData({
          username: "",
          fullName: "",
          email: "",
          password: "",
        });
        setselectedAction(2);
      }
      setErrorMsg("Success");
    } catch (error) {
      console.log("Error", error);
      setErrorMsg(error.response?.data?.message || "An error occurred");
    }
  };

  const authenticate = async (userId) => {
    let encryptedRequestBody;
    const __reqBody = {
      userId,
    };
    encryptedRequestBody = encryptedPayload(__reqBody);
    try {
      const response = await axios.post(URI.authenticate, {
        encryptedRequestBody: encryptedRequestBody,
      });
      if (response.status === 200) {
        console.log(response.data);
        dispatchTo(setAccessToken(response.data.accessToken));
        dispatchTo(setRefreshToken(response.data.refreshToken));
        navigateTo("/homescreen");
      }
      setErrorMsg("Success");
    } catch (error) {
      console.log("Error", error);
      setErrorMsg(error.response?.data?.message || "An error occurred");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailValidation(formData.email)) {
      let encryptedRequestBody;
      const __reqBody = {
        email: formData.email,
        password: formData.password,
      };
      encryptedRequestBody = encryptedPayload(__reqBody);
      try {
        const response = await axios.post(URI.login, {
          encryptedRequestBody: encryptedRequestBody,
        });

        if (response.status === 200) {
          console.log("Id:", response.data.data.user._id);
          const id = response.data.data.user._id;
          authenticate(id);
          // navigateTo("/homescreen");
        }
        setErrorMsg("Success");
      } catch (error) {
        console.log("Error", error);
        setErrorMsg(error.response?.data?.message || "An error occurred");
      }
    } else {
      setErrorMsg("Email not valid");
    }
  };

  const ValidateSignup = (e) => {
    e.preventDefault();
    if (emailValidation(formData.email)) {
      if (
        formData.password === formData.confirmPassword &&
        formData.password.match(
          /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,40}$/
        )
      ) {
        handleSignup(e);
      } else {
        setErrorMsg("Invalid Password");
      }
    } else {
      setErrorMsg("Email not valid");
    }
  };

  return (
    <div className="onboarding">
      <div className="left_onboard">
        <h3>Welcome to Expense Manager</h3>
        <div className="action_btn">
          <button
            className={`${
              selectedAction === 1 ? "select_btn" : "unselect_btn"
            }`}
            onClick={() => setselectedAction(1)}
          >
            SignUp
          </button>
          <button
            className={`${
              selectedAction === 2 ? "select_btn" : "unselect_btn"
            }`}
            onClick={() => setselectedAction(2)}
          >
            Login
          </button>
        </div>
        <div className="form_cont">
          {selectedAction === 1 ? (
            <form onSubmit={ValidateSignup}>
              <div>
                {/* <label>Username</label> */}
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username.replace(/[^a-z0-9]/g, "")}
                  onChange={handleChange}
                  placeholder="Username"
                  className="input_box_style"
                  autoComplete="off"
                />
              </div>
              <div>
                {/* <label>Full Name</label> */}
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="input_box_style"
                  autoComplete="off"
                />
              </div>

              <div>
                {/* <label>Email</label> */}
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email.replace(/[^a-zA-Z0-9@._-]/g, "")}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input_box_style"
                  autoComplete="off"
                />
              </div>

              <div>
                {/* <label>Password</label> */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="off"
                  className="input_box_style password_cont"
                />

                <img
                  className="password_toggle_icon"
                  onClick={togglePasswordVisibility}
                  src={showPassword ? eyeOpen : eyeClose}
                  alt="Toggle visibility"
                />
              </div>
              <div>
                {/* <label>Password</label> */}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  autoComplete="off"
                  className="input_box_style password_cont"
                />

                <img
                  className="password_toggle_icon"
                  onClick={toggleConfirmPasswordVisibility}
                  src={showConfirmPassword ? eyeOpen : eyeClose}
                  alt="Toggle visibility"
                />
              </div>

              <div className="msg_cont">{errorMsg}</div>
              <button type="submit" className="submit_btn">
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <div>
                {/* <label>Email</label> */}
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email or username"
                  className="input_box_style"
                />
              </div>

              <div>
                {/* <label>Password</label> */}
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input_box_style"
                />
              </div>

              <button type="submit" className="submit_btn">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
      <div
        className="right_onboard"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default Onboarding;
