import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const getUserDetails = catchAsyn(async ({ queryKey }) => {
   const { infoAdmin, userId } = queryKey[1];
   const config = {
      headers: {
         Authorization: `Bearer ${infoAdmin.token}`,
      },
   };
   const { data } = await axios.get(`/api/users/${userId}`, config);
   return data;
});

export const useUserDetails = (infoAdmin, userId) => {
   return useQuery(["getUserDetails", { infoAdmin, userId }], getUserDetails, {
      onSuccess: (myOrders) => {
         // toast.success(
         //   `Get My Orders Successfully ${JSON.stringify(myOrders, null, 2)}`
         // );
         // toast.success(`Get User Information Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      enabled: Boolean(userId),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
   });
};
