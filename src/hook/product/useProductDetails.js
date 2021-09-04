import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const getProductDetails = catchAsyn(async ({ queryKey }) => {
   const id = queryKey[1];
   const { data } = await axios.get(`/api/products/${id}`);

   return data;
});

export const useProductDetails = (id, initialData) => {
   // export const useProductDetails = (id) => {
   return useQuery(["getProductDetails", id], getProductDetails, {
      initialData,
      onSuccess: (products) => {
         // toast.success(`Get ${products.name} Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      enabled: Boolean(id),
   });
};
