import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const getMyOrders = catchAsyn(async ({ queryKey }) => {
   const userInfo = queryKey[1];
   const config = {
      headers: {
         Authorization: `Bearer ${userInfo.token}`,
      },
   };

   const { data } = await axios.get(`/api/orders/myorders`, config);
   return data;
});

export const useMyOrders = (userInfo) => {
   return useQuery(["getMyOrders", userInfo], getMyOrders, {
      onSuccess: (myOrders) => {
         // toast.success(`Get My Orders Successfully`);
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
