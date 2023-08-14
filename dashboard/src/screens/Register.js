import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { register } from "../Redux/Actions/RegisterActions";
import Header from "./../components/Header";
import Sidebar from "../components/sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 4000,
};

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const registerRegister = useSelector((state) => state.registerRegister);
  const { error, loading, registerInfo } = registerRegister;

  useEffect(() => {
    if (registerInfo) {
    }
  }, [registerInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(role, name, email, password));
    toast.success("New User Added", ToastObjects);
  };

  return (
    <>
      <Sidebar/>
      <main className="main-wrap">
      <Header />
      <ToastContainer />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="" className="btn btn-danger text-white">
              Go to Dashboard
            </Link>
            <h2 className="content-title">Create New Account</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Create now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="Role" className="form-label">
                      Enter User Role
                    </label>
                    <select
                      id="Role"
                      className="form-control2"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option hidden>Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                      <option value="Client">Client</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_name" className="form-label">
                      Enter Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      id="user_name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_email" className="form-label">
                      Enter Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      id="user_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="user_password" className="form-label">
                      Enter Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      id="user_password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      </main>
    </>
  );
};

export default Register;
