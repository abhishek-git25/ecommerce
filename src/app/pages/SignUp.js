import React, { useState } from "react";
import { Card, Col, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseInit";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [authVals, setAuthVals] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleSignUp = async () => {
    if (!authVals.email || !authVals.name || !authVals.password) {
      setErrors("Please fill all the fields !");
      return;
    }

    setErrors("");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        authVals.email,
        authVals.password
      );

      const user = res.user;
      await updateProfile(user, {
        displayName: authVals.name,
      });
      navigate("/signIn", {
        state: { successMessage: "Account created successfully! Login Now" },
      });
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
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div
        className="bg-light d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col lg={4} className="mx-auto">
          <h2 className="text-center mb-4">Sign Up</h2>
          <Card className="p-4 border-0 rounded-3">
            <Form>
              <FormGroup className="mt-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(event) =>
                    setAuthVals((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={(event) =>
                    setAuthVals((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  onChange={(event) =>
                    setAuthVals((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                />
              </FormGroup>
            </Form>
            <div className="mt-2 text-danger">{errors}</div>
            <div
              className="btn btn-primary btn-sm ext-center mt-4 w-50 mx-auto"
              onClick={() => handleSignUp()}
            >
              Sign Up
            </div>
            <div className="text-center mt-1">or</div>
            <div className="text-center">
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="text-primary text-decoration-none"
              >
                Sign In
              </Link>
            </div>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default SignUp;
