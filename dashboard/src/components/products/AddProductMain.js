import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [experience, setExperience] = useState(0);
  const [image, setImage] = useState("");
  const [salary, setSalary] = useState(0);
  const [designation, setDesignation] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setName(filteredValue);
  };

  const handleDeptChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setDept(filteredValue);
  };

  const handleDesignationChange = (e) => {
    const inputValue = e.target.value;
    // Remove non-alphabet characters using a regular expression
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setDesignation(filteredValue);
  };

  useEffect(() => {
    if (product) {
      toast.success("Employee Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setEmail("");
      setDept("");
      setDesignation("");
      setSalary(0);
      setImage("");
      setExperience(0);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, email, dept, experience, designation, image, salary));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to People
            </Link>
            <h2 className="content-title">Add New Employee</h2>
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
                    <label htmlFor="employee_title" className="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={handleNameChange} // Use the custom handler to filter non-alphabet characters
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="employee_email" className="form-label">
                      Employee Email
                    </label>
                    <input
                      type="email"
                      placeholder="Type here"
                      className="form-control"
                      id="product_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="employee_department" className="form-label">
                      Employee Department
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_department"
                      required
                      value={dept}
                      onChange={handleDeptChange} // Use the custom handler to filter non-alphabet characters
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="employee_experience" className="form-label">
                      Experience
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="employee_experience"
                      required
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="employee_salary" className="form-label">
                      Salary
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="employee_salary"
                      required
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Job Designation</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      required
                      value={designation}
                      onChange={handleDesignationChange} // Use the custom handler to filter non-alphabet characters
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
