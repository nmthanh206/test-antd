import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TableListProducts from "@/components/TableListProducts";
import { useRouter } from "next/router";

const ProductListScreen = () => {
   const router = useRouter();
   const user = useSelector((state) => state.userLogin.user);

   useEffect(() => {
      if (!user || !user.isAdmin) {
         router.push("/login");
      }
   }, [router, user]);
   return (
      <div>
         <h1 className="text-center">PRODUCTS</h1>
         <TableListProducts userInfo={user} />
      </div>
   );
};

export default ProductListScreen;
