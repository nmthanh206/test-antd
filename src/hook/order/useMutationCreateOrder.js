import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const createOrder = catchAsyn(async ({ userInfo, order }) => {
   //   console.log(userInfo, order);
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${userInfo.token}`,
      },
   };

   const { data } = await axios.post(`/api/orders`, order, config);
   return data;
});

export const useMutationCreateOrder = (history) => {
   return useMutation(createOrder, {
      onSuccess: (order) => {
         //   console.log(order);
         toast.success(`Create Order Successfully ${order._id}`);
         //  dispatch(resetCart());  qua orderscreen moi reset
         // toast.success(JSON.stringify(data, null, 2));
         // history.push(redirect);
      },
      onError: (err) => {
         console.log(err);

         toast.error(`Error ${err.message}`);
      },
      onSettled: (order) => {
         history.push(`/order/${order._id}`);
      },
   });
};
