import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const deleteUser = catchAsyn(async ({ infoAdmin, userIdDelete }) => {
   const config = {
      headers: {
         Authorization: `Bearer ${infoAdmin.token}`,
      },
   };

   await axios.delete(`/api/users/${userIdDelete}`, config);
});

export const useMutationDeleteUser = () => {
   const queryClient = useQueryClient();
   return useMutation(deleteUser, {
      onSuccess: (userDeleted) => {
         // console.log(userDeleted);

         toast.success(`Delete User Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      onSettled: (userDeleted) => {
         queryClient.invalidateQueries("getlistUsers");
      },
   });
};
