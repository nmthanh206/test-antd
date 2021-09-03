import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";
import { getSignature } from "@/utils/getSignature";

const createProduct = catchAsyn(async ({ infoAdmin, product, formData }) => {
   const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
   const { signature, timestamp } = await getSignature();
   formData.append("signature", signature);
   formData.append("timestamp", timestamp);
   formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

   const result = await axios.post(url, formData);
   const newProduct = { ...product, image: result.data.public_id };
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
