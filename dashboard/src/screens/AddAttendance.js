import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../components/LoadingError/Toast";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";


const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddAttendance = () => {
  const products = useSelector(({ productList }) => productList.products);

  const [error, setError] = useState("");
  const [month, setMonth] = useState("");

  const handlePublishNow = async () => {
    const attendanceData = products.map((product) => {
      const attendanceInput = document.querySelector(
        `input[name=attendance_${product._id}]:checked`
      );
      const attendanceValue = attendanceInput ? +attendanceInput.value : undefined; // Convert to a number

      return {
        employeeName: product.name,
        employeeEmail: product.email,
        attendance: attendanceValue,
        month: month, // Add the selected month to the attendance data
      };
    });

    // Check if any radio button is left empty
    const isAnyEmpty = attendanceData.some(
      (attendance) => attendance.attendance === undefined
    );
    if (isAnyEmpty) {
      setError("Please fill all the radio buttons.");
      return;
    }

    try {
      await axios.post("/api/attendance", { attendanceData });
      toast.success("New Attendance Added", ToastObjects);
      // Clear error
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to save attendance.");
    }
  };


  return (
    <>
      <Toast />
      <Sidebar />
      <main className="main-wrap">
        <Header />

        <section className="content-main">
          <div className="content-header">
            <Link to="/attendance" className="btn btn-danger text-white">
              Go to Attendance
            </Link>
            <h2 className="content-title">Add Attendance</h2>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePublishNow}
              >
                Publish now
              </button>
            </div>
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
                <th>Attendance {month}</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically with employee data */}
              {products.length ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>
                      <span className="absent">
                        <input
                          type="radio"
                          name={`attendance_${product._id}`}
                          value={1} // Set the value as 1 for absence
                        />{" "}
                        Absent
                      </span>
                      <span>
                        <input
                          type="radio"
                          name={`attendance_${product._id}`}
                          value={0} // Set the value as 0 for presence
                        />{" "}
                        Present
                      </span>
                    </td>
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
        {error && <p>{error}</p>}
      </main>
    </>
  );
};

export default AddAttendance;
