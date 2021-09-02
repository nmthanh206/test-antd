import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const resetPassowrd = catchAsyn(async ({ password, token }) => {
   const { data } = await axios.patch(`/api/users/resetPassword/${token}`, {
      password,
   });
   return data;
});

export const useMutationResetPassword = () => {
   return useMutation(resetPassowrd, {
      onSuccess: (response) => {
         toast.success(response.message);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
   });
};
