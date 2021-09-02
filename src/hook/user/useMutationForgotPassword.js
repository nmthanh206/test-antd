import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const forgotPassowrd = catchAsyn(async ({ email }) => {
   const { data } = await axios.post(`/api/users/forgotPassword`, { email });
   return data;
});

export const useMutationForgotPassword = () => {
   return useMutation(forgotPassowrd, {
      onSuccess: (response) => {
         //   console.log(editUser);

         toast.success(response.message);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
   });
};
