import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import axios from "axios";

const Payroll = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get("/api/people/")
      .then((res) => {
        console.log("res", res);
        setPeople(res.data.people);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  console.log("people", people);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />

        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Payroll Management</h2>
          </div>
        </section>
        <div className="att-header">
          <table className="table2">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically with employee data */}
              {people.length ? (
                people.map((people) => (
                  <tr key={people.id}>
                    <td>{people.name}</td>
                    <td>{people.email}</td>
                    <td>{people.dept}</td>
                    <td>{people.description}</td>
                    <td>{people.countInStock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Payroll;
