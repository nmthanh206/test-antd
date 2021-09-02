import { Spin } from "antd";
import React from "react";

const Loader = ({ size = "large" }) => {
   return (
      <div className="flex justify-center items-center w-full h-screen">
         <Spin size={size} />
      </div>
   );
};

export default Loader;
