import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { catchAsyn } from "@/utils/catchAsync";

const createProductReview = catchAsyn(
   async ({ userInfo, productId, review }) => {
      // console.log({ userInfo, productId, review });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);
   }
);
export const useMutationCreatetReview = (id) => {
   const queryClient = useQueryClient();
   return useMutation(createProductReview, {
      onMutate: async ({ review: { rating, comment }, userInfo: { name } }) => {
         await queryClient.cancelQueries(["getProductDetails", id]);
         const current = queryClient.getQueryData(["getProductDetails", id]);

         queryClient.setQueryData(["getProductDetails", id], (product) => {
            const today = new Date();
            const dd = today.getDate();
            const mm = today.getMonth() + 1;

            const yyyy = today.getFullYear();
            const newReviews = [
               ...product.reviews,
               { rating, comment, createdAt: `${yyyy}-${mm}-${dd}`, name },
            ];
            return { ...product, reviews: [...newReviews] }; //! khong duoc mutate product
         });

         toast.success(`Create Review Successfully`);
         // return current;
         return { current }; //!return o day se xuong context o error
      },
      onError: (err, productCreateReview, context) => {
         console.log(err, productCreateReview, context);
         queryClient.setQueryData(["getProductDetails", id], context.current); //?rollback ve array review current ban dau
         toast.error(`Failed to create review ${err.message}`);
      },
      // onSettled: (productReview) => {
      //   queryClient.invalidateQueries(["getProductDetails", id]);
      // },
   });
};
