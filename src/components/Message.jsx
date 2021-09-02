import { Alert } from "antd";
import React from "react";

const Message = ({ children, type = "info" }) => {
  return <Alert message={children} type={type} showIcon />;
};

export default Message;
