import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";
import { getSignature } from "@/utils/getSignature";

const updateProduct = catchAsyn(
   async ({ infoAdmin, product, formData, changed }) => {
      let updateProduct = { ...product };

      if (changed) {
         const { data: success } = await axios.delete(
            `/api/image/${updateProduct.image}`
         );
         if (success.result !== "ok") {
            throw new Error("Upload product failed");
         }
         const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
         const { signature, timestamp } = await getSignature();
         formData.append("signature", signature);
         formData.append("timestamp", timestamp);
         formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

         const result = await axios.post(url, formData);

         updateProduct = { ...updateProduct, image: result.data.public_id };
      }

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
   }
);

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
