import React from "react";

const Orders = (props) => {
  const { orders } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Dept Name</th>
          <th scope="col">Dept Head</th>
          <th scope="col">Head Email</th>
          <th scope="col">Total Employees</th>
          <th scope="col">Total Project Done</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>{order.user.department}</td>
            <td>{order.user.name}</td>
            <td>{order.user.email}</td>
            <td>
              {order.isPaid ? (
                <span>
                  100
                </span>
              ) : (
                <span>
                  50
                </span>
              )}
            </td>
            <td>
            {order.isPaid ? (
                <span>
                  10
                </span>
              ) : (
                <span>
                  6
                </span>
              )}
            </td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Delivered</span>
              ) : (
                <span className="badge btn-dark">Not delivered</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
