import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Button, Card, Col } from "react-bootstrap";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { ToastContainer, toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  cartSelector,
  checkoutCartAsync,
  deleteCartAsync,
  fetchCartAsync,
  loadingSelector,
  productQuantityAsync,
} from "../../redux/cartReducer";

const Cart = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [cartData, setCartData] = useState();

  const dispatch = useDispatch();
  const cartList = useSelector(cartSelector);
  const loader = useSelector(loadingSelector);

  useEffect(() => {
    fetchCartProducts();
    return () => {
      console.log("unmounted");
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, []);

  const checkout = async () => {
    dispatch(checkoutCartAsync(cartData));
  };

  const handleProductQuantity = async (product, quantity) => {
    dispatch(productQuantityAsync({ product, quantity }));
  };

  const handleDelete = async (product) => {
    const cartQuery = query(
      collection(db, "Cart"),
      where("productId", "==", product.productId),
      where("uid", "==", userData?.uid)
    );

    const querySnapshot = await getDocs(cartQuery);

    if (!querySnapshot.empty) {
      const cartDoc = querySnapshot.docs[0];
      await deleteDoc(cartDoc.ref);
      toast("Product Deleted !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
      });
    } else {
      toast("Something Went Wrong !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
  };

  const fetchCartProducts = () => {
    try {
      onSnapshot(
        query(collection(db, "Cart"), where("uid", "==", userData?.uid)),
        (snapshot) => {
          const productsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartData(productsList);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalCartPrice = cartList?.reduce(
    (acc, curVal) => acc + curVal?.totalPrice,
    0
  );

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <div className="d-flex flex-wrap">
          {!cartList || cartList?.length <= 0 ? (
            <div className="w-100">
              <h3 className="text-center">No items in the cart</h3>
            </div>
          ) : (
            cartList?.map((item, index) => {
              return (
                <div key={index}>
                  <ProductCard
                    product={item}
                    index={item.productId}
                    handleProductQuantity={handleProductQuantity}
                    handleDelete={handleDelete}
                    cartData={"In Cart"}
                  />
                </div>
              );
            })
          )}
        </div>
        {/* <Divider/> */}
        <hr className="mt-5 mb-4" />
        {totalCartPrice > 0 && (
          <Col lg={2} className="mx-auto">
            <Card className="border-0 shadow-sm bg-light mx-auto p-2">
              <Card.Body className="d-flex justify-content-center flex-column">
                <h5 className="d-flex">Total Price : {totalCartPrice}</h5>
                <Button
                  variant="warning"
                  className="mt-2 text-center"
                  onClick={() => checkout()}
                >
                  {loader ? (
                    <LineWave
                      height="100"
                      width="100"
                      color="#fff"
                      ariaLabel="line-wave"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={loader}
                      firstLineColor=""
                      middleLineColor=""
                      lastLineColor=""
                    />
                  ) : (
                    "Proceed To Buy"
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </div>
    </>
  );
};

export default Cart;
