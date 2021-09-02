import React from "react";
import { Row, Col } from "antd";
import useMobile from "../hook/useMobile";

const Container = ({ children }) => {
  const mobile = useMobile();
  return (
    // <Row className="px-6 bg-gray-100 h-full min-h-screen">
    <Row className="px-6 bg-gray-100 h-full min-h-screen">
      <Col md={20} offset={mobile ? 0 : 2} xs={24} className="bg-white">
        {children}
      </Col>
    </Row>
  );
};

export default Container;
