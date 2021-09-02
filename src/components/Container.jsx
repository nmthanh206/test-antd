import React from "react";
import { Row, Col } from "antd";

const Container = ({ children }) => {
   return (
      // <Row className="px-6 bg-gray-100 h-full min-h-screen">
      <Row className="px-6 h-full min-h-screen bg-gray-100">
         <Col md={20} offset={2} xs={24} className="bg-white">
            {children}
         </Col>
      </Row>
   );
};

export default Container;
