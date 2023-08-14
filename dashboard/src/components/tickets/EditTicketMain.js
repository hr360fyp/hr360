import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editTicket,
  updateTicket,
} from "../../Redux/Actions/TicketActions";
import { TICKET_UPDATE_RESET } from "../../Redux/Constants/TicketConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditTicketMain = (props) => {
  const { ticketId } = props;

  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [crtby, setCreatedBy] = useState("");
  const [asgnto, setAsgnto] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const people = useSelector(({peopleList}) => peopleList.people)
  console.log("people",people)

  const ticketEdit = useSelector((state) => state.ticketEdit);
  const { loading, error, ticket } = ticketEdit;

  const ticketUpdate = useSelector((state) => state.ticketUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = ticketUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TICKET_UPDATE_RESET });
      toast.success("Ticket Updated", ToastObjects);
    } else {
      if (!ticket || ticket._id !== ticketId) {
        dispatch(editTicket(ticketId));
      } else {
        setDescription(ticket.description);
        setPriority(ticket.priority);
        setCreatedBy(ticket.crtby);
        setAsgnto(ticket.asgnto)
        setDeadline(ticket.deadline);
        setStatus(ticket.status);
      }
    }
  }, [ticket, dispatch, ticketId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTicket({
        _id: ticketId,
        description,
        priority,
        crtby,
        asgnto,
        deadline,
        status,
      })
    );
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
            <h2 className="content-title">Update Ticket</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Update now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
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
                          id="ticket_ctdby"
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
                          className="form-control"
                          required
                          value={asgnto}
                          onChange={(e) => setAsgnto(e.target.value)}
                        >
                          <option value="">Select an option</option>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditTicketMain;
