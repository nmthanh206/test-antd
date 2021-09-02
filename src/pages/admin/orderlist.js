import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TableListOrders from "@/components/TableListOrders";
import { useRouter } from "next/router";

const OrderListScreen = () => {
   const router = useRouter();
   const user = useSelector((state) => state.userLogin.user);
   useEffect(() => {
      if (!user || !user.isAdmin) {
         router.push("/login");
      }
   }, [router, user]);
   return (
      <div>
         <h1 className="text-center">ORDERS</h1>
         <TableListOrders userInfo={user} />
      </div>
   );
};

export default OrderListScreen;
