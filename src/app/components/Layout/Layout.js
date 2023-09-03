// Layout.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // You can define your custom styles in this CSS file
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <div className="layout">
   
      <Sidebar />
      <div className="content">
        <Header />
        {/* The Outlet will render the appropriate child route component */}
        <Container fluid  >
          <Row >
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
