import { Spin } from "antd";
import React from "react";

const Loader = ({ size = "large" }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin size={size} />
    </div>
  );
};

export default Loader;
