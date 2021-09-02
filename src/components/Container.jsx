import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Container = ({ children }) => {
   const user = useSelector((state) => state.userLogin.user);
   const [admin, setIsAdmin] = useState({ offset: 2, md: 20 });
   useEffect(() => {
      if (typeof window !== "undefined") {
         if (user && user.isAdmin) {
            setIsAdmin({ offset: 0, md: 24 });
         } else setIsAdmin({ offset: 2, md: 20 });
      }
   }, [user]);
   return (
      // <Row className="px-6 bg-gray-100 h-full min-h-screen">
      <Row className="px-6 h-full min-h-screen bg-gray-100">
         <Col
            md={admin.md}
            offset={admin.offset}
            // md={user && user.isAdmin ? 24 : 20}
            // offset={user && user.isAdmin ? 0 : 2}
            xs={24}
            className="bg-white"
         >
            {children}
         </Col>
      </Row>
   );
};

export default Container;
