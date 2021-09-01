import axios from "axios";
import { useMutation } from "react-query";

const login = async ({ email, password }) => {
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
};

export const useMutationLoginUser = (history) => {
   //    const dispatch = useDispatch();
   return useMutation(login, {
      onSuccess: (user) => {},
      onError: (err) => {},
   });
};
