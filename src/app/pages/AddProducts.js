import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addNewProductAsync } from "../../redux/productReducer";


const AddProducts = () => {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    image: "",
    products: "",
    price: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData , "22");
     dispatch(addNewProductAsync(formData))
  };
  return (
    <div className="mt-3 d-flex flex-column mx-auto" style={{width : "80%"}}>
      <h2>Add a New Product</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="products">
          <Form.Label>Products</Form.Label>
          <Form.Control
            type="text"
            name="products"
            value={formData.products}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProducts;
