import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePeople} from "../../Redux/Actions/PeopleActions";

const People = (props) => {
  const { people } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deletePeople(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-people-grid shadow-sm">
          <Link to="#" className="mb-2 img-wrap">
            <img src={people.image} alt="People" />
          </Link>
          <div className="info-wrap">
            <div className="title text-truncate mb-2">Name: {people.name}</div>
            <div className="title text-truncate mb-2">Email: {people.email}</div>
            <div className="title text-truncate mb-2">Department: {people.dept}</div>
            <div className="title text-truncate mb-2">Experience: {people.price}</div>
            <div className="title text-truncate mb-2">Salary: Rs.{people.countInStock}</div>
            <div className="title text-truncate mb-4">Job Designation: {people.description}</div>
            <div className="row">
            <Link
                to={`/people/${people._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(people._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default People;
