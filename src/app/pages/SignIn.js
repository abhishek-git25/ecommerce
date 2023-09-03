import React, { useEffect, useState } from "react";
import { Card, Col, Form, FormGroup } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const location = useLocation();
  let signUpSuccessMessage = location?.state?.successMessage;

  const [authVals, setAuthVals] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (signUpSuccessMessage) {
      toast(signUpSuccessMessage, {
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
    location.state = null;
  }, []);

  const [errors, setErrors] = useState("");

  const handleSignIn = async () => {
    if (!authVals.email || !authVals.password) {
      setErrors("Please fill all the fields !");
      return;
    }

    setErrors("");

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        authVals.email,
        authVals.password
      );

      navigate("/" , {state :{successMessage : "Signed in successfully !"}});
    } catch (error) {
      toast(error.message, {
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

  return (
    <div>
      <ToastContainer
/>

      <div
        className="bg-light d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col lg={4} className="mx-auto">
          <h2 className="text-center mb-4">Sign In</h2>
          <Card className="p-4 border-0 rounded">
            <Form>
              <FormGroup className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(e) =>
                    setAuthVals((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={(e) =>
                    setAuthVals((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </FormGroup>
            </Form>
            <div className="text-danger text-center">{errors}</div>
            <div
              className="btn btn-primary btn-sm ext-center mt-4 w-50 mx-auto"
              onClick={() => handleSignIn()}
            >
              Sign In
            </div>
            <div className="text-center mt-1">or</div>
            <div className="text-center">
              Create new account?{" "}
              <Link
                to={"/signUp"}
                className="text-primary text-decoration-none"
              >
                Sign Up
              </Link>
            </div>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default SignIn;
