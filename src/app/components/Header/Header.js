// Header.js
import React, { useEffect } from "react";
import "./Header.module.css";
import { Navbar, Nav, NavDropdown, Container, Form } from "react-bootstrap";
import { HiShoppingBag } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useValue } from "../../Context/searchContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseInit";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector, fetchCartAsync } from "../../../redux/cartReducer";


const Header = () => {
  const navigate = useNavigate();
  const productsList = useSelector(cartSelector);
  const dispatch =  useDispatch()


  useEffect(() => {
    dispatch(fetchCartAsync());
  }, []);


  console.log(productsList.length , "25");

  const { pathname } = useLocation();

  let userData = JSON.parse(localStorage.getItem("userData"));

  let username = userData?.userName ? userData?.userName : "";

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  const { setSearch } = useValue();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          {pathname !== "/" && (
            <Navbar.Brand href="/">Just Buy E-Com</Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {pathname === "/" && (
            <Form.Control
              type="text"
              placeholder="Search"
              className="w-50 mx-auto"
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <div className="ms-auto d-flex align-items-center position-relative">
            <span id="cart-badge" className="badge badge-danger rounded position-absolute" style={{ bottom : "20px" , right : "110px", zIndex : 100000 ,backgroundColor : "red"}}>
             {productsList ? productsList.length : 0} 
            </span>
            <HiShoppingBag
              style={{ color: "white", cursor: "pointer" }}
              size={30}
              className="mt-1 me-1 "
              onClick={() => navigate("/cart")}
            />
            <div className="text-white me-3 mt-1">Cart</div>

            <Nav className="d-none d-lg-block position-relative">
              <NavDropdown
                title={username}
                id="profile-dropdown"
                style={{
                  fontSize: "14px",
                  maxWidth: "200px",
                  left: "-80px!important",
                }}
                className="custom-profile-dropdown dropdown-menu-left me-5 position-static mt-1"
              >
                <NavDropdown.Item href="/myorders">My Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                {userData ? (
                  <NavDropdown.Item onClick={() => logout()}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item onClick={() => navigate("/signIn")}>
                    Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </div>
        </Container>
        <style></style>
      </Navbar>
    </>
  );
};

export default Header;
