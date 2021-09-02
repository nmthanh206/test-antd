import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../reducers/userReducer";
import { catchAsyn } from "@/utils/catchAsync";

export const register = catchAsyn(async ({ name, email, password }) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
   );

   return data;
});
export const useMutationRegisterUser = (history, redirect) => {
   const dispatch = useDispatch();
   return useMutation(register, {
      onSuccess: (user) => {
         //   console.log(user);

         toast.success(`Register Successfully ${user.name}`);
         dispatch(loginUser(user));
         history.push(redirect);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err}`);
      },
      // onSettled: (data) => {
      //   toast.info(`!!!! ${JSON.stringify(data, null, 2)}`);
      // },
   });
};
