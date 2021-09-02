import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const listTopProducts = catchAsyn(async () => {
   const { data } = await axios.get(`/api/products/top`);

   return data;
});

export const useTopProducts = () => {
   // console.log(Boolean(id));
   return useQuery("listTopProducts", listTopProducts, {
      onSuccess: (products) => {
         // toast.success(`Get Product Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
   });
};
