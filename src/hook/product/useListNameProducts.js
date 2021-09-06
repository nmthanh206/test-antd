import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setListNameProducts } from "@/reducers/productReducer";
import { catchAsyn } from "@/utils/catchAsync";

const getListNameProducts = catchAsyn(async () => {
   const { data } = await axios.get(`/api/products/names`);
   return data;
});

export const useListNameProducts = (hasMounted) => {
   const dispatch = useDispatch();
   return useQuery("getListNameProducts", getListNameProducts, {
      onSuccess: (products) => {
         dispatch(setListNameProducts(products.names));
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      enabled: hasMounted,
   });
};
