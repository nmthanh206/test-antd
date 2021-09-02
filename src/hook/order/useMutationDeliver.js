import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const deliverOrder = catchAsyn(async ({ userInfo, order }) => {
   const config = {
      headers: {
         Authorization: `Bearer ${userInfo.token}`,
      },
   };

   const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
   );

   return data;
});

export const useMutationDeliver = () => {
   const queryClient = useQueryClient();
   return useMutation(deliverOrder, {
      onSuccess: (order) => {
         //   console.log(order);
         queryClient.invalidateQueries("getOrderDetails");

         // toast.success(`Update OrderDeliver Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
   });
};
