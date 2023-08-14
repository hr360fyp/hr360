import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TICKET_CREATE_RESET } from "../../Redux/Constants/TicketConstants";
import { createTicket } from "./../../Redux/Actions/TicketActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddTicketMain = () => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [crtby, setCreatedBy] = useState("");
  const [asgnto, setAsgnto] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const people = useSelector(({peopleList}) => peopleList.people)
  console.log("people",people)

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { loading, error, ticket } = ticketCreate;

  useEffect(() => {
    if (ticket) {
      toast.success("Ticket Added", ToastObjects);
      dispatch({ type: TICKET_CREATE_RESET });
      setDescription("");
      setPriority("");
      setCreatedBy("");
      setDeadline("");
      setStatus("");
    }
  }, [ticket, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTicket(description, priority, crtby, asgnto, deadline, status));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/tickets" className="btn btn-danger text-white">
              Go to Ticket
            </Link>
            <h2 className="content-title">Add New Ticket</h2>
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
                    <label htmlFor="ticket_desc" className="form-label">
                      Short Description
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="ticket_desc"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ticket_priority" className="form-label">
                      Priority Level
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="ticket_priority"
                      required
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ticket_crtby" className="form-label">
                      Created by
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="ticket_crtby"
                      required
                      value={crtby}
                      onChange={(e) => setCreatedBy(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ticket_asgnto" className="form-label">
                      Assigned to
                    </label>
                    <select
                      id="ticket_asgnto"
                      className="form-control2"
                      required
                      value={asgnto}
                      onChange={(e) => setAsgnto(e.target.value)}
                    >
                      <option id= "" value="">Select an Employee</option>
                      {people.map((people) => (
                        <option key={people._id} value={people.name}>
                          {people.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ticket_deadline" className="form-label">
                      Deadline
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="ticket_deadline"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="ticket_status" className="form-label">
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="ticket_status"
                      required
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
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

export default AddTicketMain;
