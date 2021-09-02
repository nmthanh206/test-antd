import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetCart } from "../../reducers/cartReducer";
import { catchAsyn } from "@/utils/catchAsync";

const payOrder = catchAsyn(async ({ userInfo, orderId, paymentResult }) => {
   console.log(userInfo, orderId);
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${userInfo.token}`,
      },
   };

   const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
   );

   return data;
});
export const useMutationPayment = () => {
   const queryClient = useQueryClient();
   const dispatch = useDispatch();
   return useMutation(payOrder, {
      onSuccess: (order) => {
         queryClient.invalidateQueries("getOrderDetails");
         // toast.success(`Update OrderPay Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      onSettled: () => {
         dispatch(resetCart());
      },
   });
};
