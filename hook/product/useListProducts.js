import { catchAsyn } from "@/utils/catchAsync";
import axios from "axios";
import { useQuery } from "react-query";

import { toast } from "react-toastify";

const getProducts = catchAsyn(async ({ queryKey }) => {
   const { keyword = "", pageNumber = 1 } = queryKey[1];

   const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
   );
   return data;
});

export const useListProducts = ({ pageNumber, keyword }, initialData) => {
   // const dispatch = useDispatch();
   return useQuery(["getProducts", { pageNumber, keyword }], getProducts, {
      initialData,
      onSuccess: (products) => {
         // dispatch(setProducts(products));
         // toast.success(`Get List Product Successfully`);
      },
      onError: (err) => {
         toast.error(`Error ${err.message}`);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
   });
};
