import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const deleteProduct = catchAsyn(async ({ infoAdmin, productId }) => {
   const config = {
      headers: {
         Authorization: `Bearer ${infoAdmin.token}`,
      },
   };

   await axios.delete(`/api/products/${productId}`, config);
});

export const useMutationDeleteProduct = () => {
   const queryClient = useQueryClient();
   return useMutation(deleteProduct, {
      onSuccess: (deleteProduct) => {
         toast.success(`Delete Product Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      onSettled: (deleteProduct) => {
         queryClient.invalidateQueries("getProducts");
      },
   });
};
