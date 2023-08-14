import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PEOPLE_CREATE_RESET } from "../../Redux/Constants/PeopleConstants";
import { createPeople } from "./../../Redux/Actions/PeopleActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddPeopleMain = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const peopleCreate = useSelector((state) => state.peopleCreate);
  const { loading, error, people } = peopleCreate;

  useEffect(() => {
    if (people) {
      toast.success("Employee Added", ToastObjects);
      dispatch({ type: PEOPLE_CREATE_RESET });
      setName("");
      setEmail("");
      setDept("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
    }
  }, [people, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPeople(name, email, dept, price, description, image, countInStock));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/people" className="btn btn-danger text-white">
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
                    <label htmlFor="people_title" className="form-label">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="people_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="people_email" className="form-label">
                      Employee Email
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="people_email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="people_department" className="form-label">
                      Employee Department
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="people_department"
                      required
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="people_price" className="form-label">
                      Experience
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="people_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="people_salary" className="form-label">
                      Salary
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="people_salary"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Job Designation</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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

export default AddPeopleMain;
