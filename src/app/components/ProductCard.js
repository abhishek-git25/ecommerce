import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ProductCard = ({
  product,
  index,
  addToCart,
  handleProductQuantity,
  handleDelete,
  cartData,
}) => {
  const [quantity, setQuantity] = useState(
    product?.quantity ? product?.quantity : 1
  );

  // const userData = JSON.parse(localStorage.getItem('userDats'))

  const handleQuantityDecrease = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const { pathname } = useLocation();

  return (
    <div key={index}>
      <Card
        style={{ width: "18rem" }}
        className="border-0 shadow-sm p-2 ms-2 mb-3"
      >
        <Card.Img
          variant="top"
          src={product?.image}
          style={{ width: "fit-content" }}
          height={200}
          className="mx-auto"
        />
        <Card.Body>
          <Card.Title>{product?.product?.slice(0, 20) + "..."}</Card.Title>
          <Card.Text className="d-flex align-items-center justify-content-between">
            <div>₹{product.price}</div>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="secondary"
                className="rounded-circle"
                onClick={() => {
                  if (cartData === "In Cart") {
                    handleProductQuantity(
                      product,
                      quantity > 1 && quantity - 1
                    );
                    handleQuantityDecrease();
                  } else {
                    handleQuantityDecrease();
                  }
                }}
              >
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button
                variant="secondary"
                className="rounded-circle"
                onClick={() => {
                  if (cartData === "In Cart") {
                    handleProductQuantity(product, quantity + 1);
                    setQuantity(quantity + 1);
                  } else {
                    setQuantity(quantity + 1);
                  }
                }}
              >
                +
              </Button>
            </div>
          </Card.Text>
          {pathname !== "/cart" ? (
            <Button
              variant="primary d-flex justify-content-center mx-auto w-100 text-center"
              onClick={() => addToCart(product, quantity)}
            >
              Add To Cart
            </Button>
          ) : (
            <Button
              variant="danger d-flex justify-content-center mx-auto w-100 text-center"
              onClick={() => handleDelete(product)}
            >
              Remove from Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCard;
