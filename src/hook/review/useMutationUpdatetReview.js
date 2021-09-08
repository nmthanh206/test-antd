import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const updateProductReview = catchAsyn(
   async ({ userInfo, productId, review }) => {
      // console.log({ userInfo, productId, review });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.put(`/api/products/${productId}/reviews`, review, config);
   }
);

export const useMutationUpdatetReview = (id) => {
   const queryClient = useQueryClient();
   return useMutation(updateProductReview, {
      // onSuccess: (productUpdateReview) => {
      //   toast.success(`Update Review Successfully`);
      // },
      onMutate: async ({ review, userInfo: { _id } }) => {
         //   console.log(review, _id);
         await queryClient.cancelQueries(["getProductDetails", id]);
         const current = queryClient.getQueryData(["getProductDetails", id]);

         queryClient.setQueryData(["getProductDetails", id], (product) => {
            // console.log(product);
            const newReviews = product.reviews.map((rv) => {
               if (rv.user._id === _id) return { ...rv, ...review };
               return rv;
            });

            return { ...product, reviews: [...newReviews] }; //! khong duoc mutate product
         });

         // return current;
         return { current }; //!return o day se xuong context o error
      },

      onError: (err, productUpdateReview, context) => {
         console.log(err, productUpdateReview, context);
         queryClient.setQueryData(["getProductDetails", id], context.current);
         toast.error(`Failed to update review ${err.message}`);
      },
      // onSettled: (productUpdateReview) => {
      //   queryClient.invalidateQueries(["getProductDetails", id]);
      // },
      onSuccess: () => {
         toast.success(`Update Review Successfully`);
      },
   });
};
