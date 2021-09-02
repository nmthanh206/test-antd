import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const getOrderDetails = catchAsyn(async ({ queryKey }) => {
   const { userInfo, orderId } = queryKey[1];
   //   console.log(userInfo, orderId);

   const config = {
      headers: {
         Authorization: `Bearer ${userInfo.token}`,
      },
   };

   const { data } = await axios.get(`/api/orders/${orderId}`, config);

   return data;
});

export const useOrderDetails = ({ userInfo, orderId }) => {
   //   console.log(userInfo, orderId);
   return useQuery(
      ["getOrderDetails", { userInfo, orderId }],
      getOrderDetails,
      {
         onSuccess: (order) => {
            //   console.log(order);
            // toast.success(`Get Order Successfully ${JSON.stringify(order, null, 2)}`);
            // toast.success(`Get Order Successfully`);
         },
         onError: (err) => {
            console.log(err);

            toast.error(`Error ${err.message}`);
         },
         enabled: Boolean(orderId),
         refetchOnWindowFocus: false,
         refetchOnMount: true,
         retry: 1,
      }
   );
};
