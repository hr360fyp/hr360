import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";
import Toast from "../components/LoadingError/Toast";
import { login } from "../Redux/Actions/userActions";
import Message from "./../components/LoadingError/Error";
import ReCAPTCHA from "react-google-recaptcha";


const Login = ({ history }) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaResponse, setCaptchaResponse] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const captchaRef = useRef(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  useEffect(() => {
    if (role === "Admin" && userInfo) {
      history.push("/");
    } else if (role === "Employee" && userInfo) {
      history.push("/emp");
    } else if (role === "Client" && userInfo) {
      history.push("/client");
    }
  }, [role, userInfo, history]);

  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (captchaResponse) {
      dispatch(login(role, email, password));
      captchaRef.current.reset();
    } else {
      setError("Please fill the reCAPTCHA first.");
    }
  };

  return (
    <>
      <Toast />
      <img
        src="/images/logo.png"
        style={{ width: 350, height: 130, marginLeft: 620, marginTop: 100 }}
        className="logo"
        alt="HR 360 Icon"
      />
      <div className="card shadow mx-auto" style={{ maxWidth: "380px" }}>
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <select
                id="Role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option hidden>Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Client">Client</option>
              </select>
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="captcha mb-4">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey="6LfalaUmAAAAACIC-9s8wFy8o0cN1n5EZExAVPKY"
                onChange={handleCaptchaChange}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;