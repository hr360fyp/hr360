import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Attendance = () => {
  const products = useSelector(({ productList }) => productList.products);
  const [attendances, setAttendances] = useState([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    axios
      .get("/api/attendance")
      .then((res) => {
        setAttendances(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // Calculate the sum of attendance for each unique email address
  const calculateAttendanceSum = (email) => {
    const attendanceList = attendances.filter(
      (attendance) => attendance.employeeEmail === email
    );
    const attendanceSum = attendanceList.reduce(
      (sum, attendance) => sum + attendance.attendance,
      0
    );
    return attendanceSum;
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />

        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Attendance</h2>
            <Link to="/addattendance" className="btn btn-primary">
              Create new
            </Link>
          </div>
          <div>
        <select
          id="ticket_asgnto"
          className="form-control2"
          required
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option id="" value="">
            Select month
          </option>
          <option value="(January)">January</option>
          <option value="(February)">February</option>
          <option value="(March)">March</option>
          <option value="(April)">April</option>
          <option value="(May)">May</option>
          <option value="(June)">June</option>
          <option value="(July)">July</option>
          <option value="(August)">August</option>
          <option value="(September)">September</option>
          <option value="(October)">October</option>
          <option value="(November)">November</option>
          <option value="(December)">December</option>
        </select>
      </div>
        </section>
        <div className="att-header">
          <table className="table2">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Absents {month}</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically with employee data */}
              {products.length ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{calculateAttendanceSum(product.email)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data</td>
                </tr>
              )}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Attendance;
