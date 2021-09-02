import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../reducers/userReducer";
import { catchAsyn } from "@/utils/catchAsync";

const editUser = catchAsyn(async ({ infoAdmin, userEdit }) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${infoAdmin.token}`,
      },
   };

   const { data } = await axios.put(
      `/api/users/${userEdit._id}`,
      userEdit,
      config
   );
   return data;
});

export const useMutationEditUser = (userAdmin, history) => {
   const queryClient = useQueryClient();
   const dispatch = useDispatch();
   //   const history = useHistory();
   //   const userAdmin = useSelector((state) => state.userLogin.user);
   return useMutation(editUser, {
      onSuccess: (editUser) => {
         //   console.log(editUser);

         toast.success(`Edit User ${editUser.name} Successfully`);
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
      onSettled: (editUser) => {
         queryClient.invalidateQueries("getlistUsers");
         if (
            editUser._id.toString() === userAdmin._id.toString() &&
            !editUser.isAdmin
         ) {
            history.push("/login");
            dispatch(logout());
         }
      },
   });
};
