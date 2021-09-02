import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const getlistUsers = catchAsyn(async ({ queryKey }) => {
   const userInfo = queryKey[1];
   const config = {
      headers: {
         Authorization: `Bearer ${userInfo.token}`,
      },
   };
   const { data } = await axios.get(`/api/users`, config);
   return data;
});

export const useListUsers = (userInfo) => {
   return useQuery(["getlistUsers", userInfo], getlistUsers, {
      onSuccess: (myOrders) => {
         // toast.success(
         //   `Get My Orders Successfully ${JSON.stringify(myOrders, null, 2)}`
         // );
         // toast.success(`Get List Users Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      enabled: Boolean(userInfo),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
   });
};
