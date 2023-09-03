import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Table } from "react-bootstrap";
import { db } from "../../firebaseInit";

const MyOrder = () => {
  const [data, setData] = useState([]);
  

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetchCartProducts();
    return () => {
      console.log("unmounted");
    };
  }, []);

  const fetchCartProducts = () => {
    onSnapshot(
      query(collection(db, "Users"), where("uid", "==", userData?.uid)),
      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(orderList);
      }
    );
  };

  data.map((item , index) =>{
   console.log(item.productData); 
   item.productData.map((d , i)=>{
    console.log(d);
   })
  })


  return (
    <div>
      <h3 className="text-center mt-4 mb-5">Your Orders</h3>
      <Col lg={5} className="mx-auto mt-5">
        <Table striped>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Ordered Date</th>
            </tr>
          </thead>
          <tbody>
       
      
                  <tr>
                    <td></td>
                  </tr>
       
               
             
          </tbody>
        </Table>
      </Col>
    </div>
  );
};

export default MyOrder;
