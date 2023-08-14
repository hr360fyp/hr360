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
  const people = useSelector(({ peopleList }) => peopleList.people);

  const [error, setError] = useState("");

  const handlePublishNow = async () => {
    const attendanceData = people.map((people) => {
      const attendanceInput = document.querySelector(
        `input[name=attendance_${people._id}]:checked`
      );
      const attendanceValue = attendanceInput ? +attendanceInput.value : undefined; // Convert to a number

      return {
        employeeName: people.name,
        employeeEmail: people.email,
        attendance: attendanceValue,
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
        </section>
        <div className="att-header">
          <table className="table2">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee Email</th>
                <th>Attendance (Month)</th>
              </tr>
            </thead>
            <tbody>
              {/* Add table rows dynamically with employee data */}
              {people.length ? (
                people.map((people) => (
                  <tr key={people._id}>
                    <td>{people.name}</td>
                    <td>{people.email}</td>
                    <td>
                      <span className="absent">
                        <input
                          type="radio"
                          name={`attendance_${people._id}`}
                          value={1} // Set the value as 1 for absence
                        />{" "}
                        Absent
                      </span>
                      <span>
                        <input
                          type="radio"
                          name={`attendance_${people._id}`}
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
