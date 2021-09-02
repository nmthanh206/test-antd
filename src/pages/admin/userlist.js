import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TableListUsers from "@/components/TableListUsers";
import { useRouter } from "next/router";

const UserListScreen = () => {
   const router = useRouter();
   const user = useSelector((state) => state.userLogin.user);

   useEffect(() => {
      if (!user || !user.isAdmin) {
         router.push("/login");
      }
   }, [router, user]);
   return (
      <div>
         <h1 className="text-center">USERS</h1>
         <TableListUsers userInfo={user} />
      </div>
   );
};

export default UserListScreen;
