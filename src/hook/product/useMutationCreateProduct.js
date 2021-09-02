import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const createProduct = catchAsyn(async ({ infoAdmin, product, formData }) => {
   let image = "/images/sample.jpg";
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
      image = imagePath;
   }

   const newProduct = { ...product, image };
   const config = {
      headers: {
         Authorization: `Bearer ${infoAdmin.token}`,
      },
   };

   const { data } = await axios.post(`/api/products`, newProduct, config);
   return data;
});

export const useMutationCreateProduct = (history) => {
   return useMutation(createProduct, {
      onSuccess: (newProduct) => {
         //   console.log(newProduct);

         toast.success(`Create Product Successfully`);
         history.push("/admin/productlist");
      },
      onError: (err) => {
         console.log(err);
         toast.error(`Error ${err.message}`);
      },
   });
};
