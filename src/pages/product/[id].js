import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
   Row,
   Col,
   Rate,
   Button,
   Select,
   Input,
   Form,
   Image,
   Divider,
} from "antd";
// import Image from "next/link";
import { useProductDetails } from "@/hook/product";
import {
   useMutationCreatetReview,
   useMutationUpdatetReview,
} from "@/hook/review";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import Review from "@/components/Review";
import { addToCart } from "@/reducers/cartReducer";
// import productModel from "@/models/productModel";
// import dbConnect from "@/lib/dbConnect";

const { Option } = Select;
// const ProductScreen = ({ productStatic }) => {
const ProductScreen = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const [form] = Form.useForm();

   const user = useSelector((state) => state.userLogin.user);
   const { id } = router.query;

   const [textSubmit, setTextSubmit] = useState("Submit");
   const [rate, setRate] = useState(5);
   // let {
   //    data: product,
   //    isLoading,
   //    isError,
   //    error,
   // } = useProductDetails(id, productStatic);
   // if (!product) {
   //    product = productStatic;
   // }
   let { data: product, isLoading, isError, error } = useProductDetails(id);

   const { mutate: createReview, isLoadingReview } =
      useMutationCreatetReview(id);
   const { mutate: updateReview, isLoadingUpdateReview } =
      useMutationUpdatetReview(id);

   const addToCartHandler = () => {
      dispatch(
         addToCart({
            id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: form.getFieldValue().qty,
         })
      );
   };
   const handleSubmit = async ({ comment }) => {
      textSubmit === "Submit"
         ? createReview({
              userInfo: user,
              productId: id,
              review: { rating: rate, comment },
           })
         : updateReview({
              userInfo: user,
              productId: id,
              review: { rating: rate, comment },
           });
      form.setFieldsValue({ comment: "" });
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };
   if (isLoading || isLoadingReview || !product || isLoadingUpdateReview)
      return <Loader />;

   if (isError) return <div>error.... {JSON.stringify(error, null, 2)}</div>;
   return (
      <Row gutter={[20, 0]} className="mt-4">
         {/* IMAGE */}
         <Col md={12} xs={24} className="">
            <Image
               width="98%"
               height="auto"
               // layout="fill"
               src={
                  product.image.startsWith("/images")
                     ? product.image
                     : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1630656715/${product.image}`
               }
               alt={product.image}
               className="cursor-pointer"
            />
         </Col>
         {/* DETAIL */}
         <Col md={6} xm={24} className=" text-gray-600">
            <h2 className="py-3 border-0 border-b-2 border-gray-100 border-solid">
               {product.name}
            </h2>
            <Row
               className="pb-3 border-0 border-b-2 border-gray-100 border-solid"
               align="middle"
            >
               <Col span={16}>
                  <Rate allowHalf disabled defaultValue={product.rating} />
               </Col>{" "}
               <Col span={8}>
                  <div className="text-gray-400">{`${product.numReviews}  reviews`}</div>
               </Col>
            </Row>
            <Row className="py-3 border-0 border-b-2 border-gray-100 border-solid">
               <Col span={16}>
                  <div>Price:</div>
               </Col>{" "}
               <Col span={8}>
                  <strong>${product.price}</strong>
               </Col>
            </Row>

            <h3>Description: </h3>
            <div>{product.description}</div>
         </Col>
         {/* CHECKOUT */}
         <Col md={6} xm={24} className="mt-5">
            <Row
               className=" p-4 py-2 mr-7 text-base border-[1px] border-gray-200 border-solid"
               gutter={[0, 20]}
            >
               <Col span={12} className="pt-2">
                  Price
               </Col>
               <Col span={12} className="pt-2">
                  ${product.price}
               </Col>
               <Divider className=" m-0" />
               <Col span={12}>Status</Col>
               <Col span={12}>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
               </Col>

               <Divider className="m-0" />

               <Col span={12} className="max-h-6">
                  Quantity
               </Col>
               <Col span={12} className="max-h-6">
                  <Form
                     form={form}
                     initialValues={{ qty: product.countInStock > 0 ? 1 : "" }}
                  >
                     <Form.Item name="qty">
                        <Select
                           style={{ width: 120 }}
                           // onChange={handleChange}
                           className="-mt-4"
                           disabled={product.countInStock < 1}
                        >
                           {[...Array(product.countInStock).keys()].map((x) => (
                              <Option key={x + 1} value={x + 1}>
                                 {x + 1}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Form>
               </Col>

               {!user?.isAdmin && (
                  <>
                     <Divider className=" m-0" />
                     <Col span={24}>
                        <Button
                           type="primary"
                           block
                           shape="round"
                           className="h-full"
                           onClick={addToCartHandler}
                           disabled={product.countInStock < 1}
                        >
                           Add To Cart
                        </Button>
                     </Col>
                  </>
               )}
            </Row>
         </Col>
         {/* REVIEW */}

         <Col md={12} xm={24} className="">
            <div className="px-3">
               <h2>Reviews</h2>
               {product.reviews.length === 0 ? (
                  <Message>No Reviews</Message>
               ) : (
                  <Review
                     reviews={product.reviews}
                     form={form}
                     setTextSubmit={setTextSubmit}
                     setRate={setRate}
                  />
               )}

               {user ? (
                  !user.isAdmin && (
                     <>
                        <h2 className="mt-4 uppercase">
                           Write a Customer Review
                        </h2>
                        <div>
                           <div className="mb-4">
                              <Rate
                                 allowHalf
                                 defaultValue={5}
                                 value={rate}
                                 onChange={(value) => setRate(value)}
                              />
                           </div>
                           <Form
                              onFinish={handleSubmit}
                              onFinishFailed={onFinishFailed}
                              form={form}
                           >
                              <Form.Item
                                 name="comment"
                                 // label="Comment"
                                 // labelCol={{ span: 24 }}
                                 wrapperCol={{ span: 24 }}
                                 className="comment"
                              >
                                 <Input.TextArea
                                    placeholder="Write your comments"
                                    showCount
                                    maxLength={500}
                                    // style={{ minHeight: "100px" }}
                                    // autoSize={{ minRows: 5, maxRows: 10 }}
                                    className="comment"
                                 />
                              </Form.Item>
                              <Button
                                 type="primary"
                                 htmlType="submit"
                                 className="mb-4 ml-1"
                              >
                                 {textSubmit}
                              </Button>
                           </Form>
                        </div>
                     </>
                  )
               ) : (
                  <Message>
                     Please{" "}
                     <Link href={`/login?redirect=product/${id}`}>sign in</Link>{" "}
                     to write a review{" "}
                  </Message>
               )}
            </div>
         </Col>
      </Row>
   );
};

export default ProductScreen;

// export async function getStaticPaths() {
//    await dbConnect();
//    const products = await productModel.find();

//    const paths = products.map((product) => ({
//       params: { id: product._id.toString() },
//    }));

//    return { paths, fallback: "blocking" };
// }

// export async function getStaticProps({ params }) {
//    await dbConnect();

//    const product = await productModel.findById(params.id);

//    return {
//       props: {
//          product: JSON.parse(JSON.stringify(product)),
//       },
//       revalidate: 10,
//    };
// }
