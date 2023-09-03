// Sidebar.js
import React, { useState } from "react";
import { Form, Nav } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import { useLocation } from "react-router-dom";
import { filterChecks } from "../../helpers/storage";
import { useFilterValue } from "../../Context/filterContext";

const Sidebar = () => {
  

  const { pathname } = useLocation();
  const {handleFilterChecks , priceFilter , setPriceFilter} = useFilterValue()


  return (
    <div>
      {pathname === "/" && (
        <>
          <div className="sidebar ">
            {/* Logo */}
            <div className="sidebar-logo text-center py-3 pb-0">
              <h1 className="logo-text text-center">Just Buy E-com</h1>
            </div>
            {/* <Divider/> */}
            <hr></hr>

            <Form.Label>Price : {priceFilter}</Form.Label>
            <FormRange
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              // min={100}
              max={100000}
            />

            <h2 className="text-white  mt-3">Category</h2>
            <div className="d-flex flex-column justify-content-center  w-100">
              {filterChecks.map((item, index) => {
                return (
                  <div key={index}>
                  <Form.Check
                    type="checkbox"
                    label={item.label}
                    value={item.value}
                    className="mt-2"
                    onChange={(e) => handleFilterChecks(e.target.checked , e.target.value) }
                  />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
