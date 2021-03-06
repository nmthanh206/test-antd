import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../reducers/userReducer";
import { catchAsyn } from "@/utils/catchAsync";

const login = catchAsyn(async ({ email, password }) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
   );
   return data;
});

export const useMutationLoginUser = () => {
   const dispatch = useDispatch();
   return useMutation(login, {
      onSuccess: (user) => {
         dispatch(loginUser(user));
         toast.success(`Login Successfully ${user.name}`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err}`);
      },
   });
};
