import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authState } from "../helpers/storage";
import { useSelector, useDispatch } from "react-redux";
import { useValue } from "../Context/searchContext";
import { useFilterValue } from "../Context/filterContext";
import {
  actions,
  addProductAsync,
  productListAsync,
  productSelector,
} from "../../redux/productReducer";

const HomePage = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const productsList = useSelector(productSelector);
  const dispatch = useDispatch();

  const { filter, priceFilter } = useFilterValue();

  let userData = JSON.parse(localStorage.getItem("userData"));

  const { setData, searchedResults } = useValue();
  const [successMessage, setsuccessMessage] = useState(
    location?.state?.successMessage
  );

  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    dispatch(productListAsync());
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast(successMessage, {
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
    }
    authState();

    if (successMessage) {
      setsuccessMessage(null);
    }

    return () => {
      console.log("unmounted");
    };
  }, [successMessage]);

  useEffect(() => {
    handlePriceFilter();
  }, [priceFilter]);

  useEffect(() => {
    handleFilter();
  }, [filter]);

  const addToCart = async (product, quantity) => {
    if (!userData) {
      navigate("/signIn");
      return;
    }
    dispatch(addProductAsync({ product, quantity }));
  };

  let data = searchedResults ? searchedResults : productsList;

  const handleFilter = () => {
    const filteredData = products.filter((item) => {
      return filter.includes(item.category);
    });

    if (filteredData?.length > 0) {
      setData(filteredData);
    } else {
      setData(products);
    }
  };

  const handlePriceFilter = () => {
    let minPrice = 0;
    const filterPrice = products.filter((item) => {
      return item.price >= minPrice && item.price <= priceFilter;
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 d-flex flex-wrap align-items-center">
        {productsList?.map((item, index) => {
          return (
            <div key={index}>
              <ProductCard
                product={item}
                index={item.id}
                addToCart={addToCart}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
