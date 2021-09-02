import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const updateProduct = catchAsyn(async ({ infoAdmin, product, formData }) => {
   let updateProduct = { ...product };
   if (formData) {
      const configImage = {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      };
      const { data: imagePath } = await axios.post(
         "/api/upload",
         formData,
         configImage
      );

      updateProduct = { ...product, image: imagePath };
   }

   // const updateProduct = { ...product, image };
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${infoAdmin.token}`,
      },
   };

   const { data } = await axios.put(
      `/api/products/${updateProduct._id}`,
      updateProduct,
      config
   );
   return data;
});

export const useMutationUpdateProduct = (history) => {
   return useMutation(updateProduct, {
      onSuccess: (updateProduct) => {
         // console.log(updateProduct);

         toast.success(`Update Product Successfully`);
         history.push("/admin/productlist");
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
   });
};
