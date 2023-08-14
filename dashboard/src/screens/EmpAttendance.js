import React from "react";
import EmpSidebar from "../components/EmpSidebar";
import EmpHeader from "../components/EmpHeader";
import { useSelector } from "react-redux";

const Attendance = () => {
  // const [products, setProducts]=useState([])

  const products = useSelector(({productList}) => productList.products)

  // useEffect(() => {
  //   axios.get("/api/products/getproducts")
  //   .then((res)=>{
  //     console.log("res",res)
  //     setProducts(res.data)
  //   })
  //   .catch((err)=>{
  //     console.log("error",err)
  //   })
  // }, [])
  console.log("products",products)
  return (
    <>
      <EmpSidebar />
      <main className="main-wrap">
        <EmpHeader />

        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Attendance</h2>
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
              {products.length? products.map((product)=>{
                return(
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>--</td>
                  </tr>
                )
              }):"no data"}
              {/* Add more rows as needed */}
            </tbody>
          </table>
          </div>
          </main>
    </>
  );
};

export default Attendance;