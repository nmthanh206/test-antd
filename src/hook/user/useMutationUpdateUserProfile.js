import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../reducers/userReducer";
import { catchAsyn } from "@/utils/catchAsync";

const updateUserProfile = catchAsyn(async ({ userInfo, userUpdate }) => {
   console.log({ userInfo, userUpdate });
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${userInfo.token}`,
      },
   };

   const { data } = await axios.put(`/api/users/profile`, userUpdate, config);
   return data;
});

export const useMutationUpdateUserProfile = () => {
   const dispatch = useDispatch();
   return useMutation(updateUserProfile, {
      onSuccess: (updateUser) => {
         //   console.log(updateUser);

         toast.success(`Update User Profile ${updateUser.name} Successfully `);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      onSettled: (updateUser) => {
         dispatch(loginUser(updateUser));
      },
   });
};
