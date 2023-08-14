import React from "react";

const PrintComponent = React.forwardRef(({ people }, ref) => {
  return (
    <div ref={ref}>
      <h1>Print Component</h1>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {people.map((people) => (
            <tr key={people.id}>
              <td>{people.name}</td>
              <td>{people.email}</td>
              <td>{people.dept}</td>
              <td>{people.description}</td>
              <td>{people.countInStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default PrintComponent;