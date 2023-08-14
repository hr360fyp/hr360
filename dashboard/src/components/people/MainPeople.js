import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import People from "./People";
import { useDispatch, useSelector } from "react-redux";
import { listPeople } from "../../Redux/Actions/PeopleActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainPeople = () => {
  const dispatch = useDispatch();

  const peopleList = useSelector((state) => state.peopleList);
  const { loading, error, people } = peopleList;

  const peopleDelete = useSelector((state) => state.peopleDelete);
  const { error: errorDelete, success: successDelete } = peopleDelete;

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(listPeople());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">People Management</h2>
        <div>
          <Link to="/addpeople" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* people */}
              {people
                .filter((people) =>
                  people.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((people) => (
                  <People people={people} key={people._id} />
                ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainPeople;
