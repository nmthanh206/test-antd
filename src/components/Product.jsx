/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card } from "antd";
import { SearchOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import Link from "next/link";
import Image from "next/image";
const Product = ({ product, isLoading }) => {
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };

   if (isLoading) {
      return (
         <div className="mt-7 w-[285px] h-[482px] border-2 border-solid animate-pulse border-gray-300/50">
            <div className="w-full h-[227px] bg-gray-300/50"></div>
            <div className=" p-6 w-full h-[200px] border-2 border-solid border-gray-300/50">
               <div className=" min-h-[65px]">
                  <div className="mb-4 w-full min-h-[22px] bg-gray-300/50"></div>
                  <div className="w-full min-h-[22px] bg-gray-300/50"></div>
               </div>
               <div className="flex justify-between items-center">
                  <div className="w-[65%] min-h-[20px]">
                     <Rate allowHalf disabled defaultValue={0} />
                  </div>
                  <div className="flex-1 mt-1 min-h-[20px] bg-gray-300/50"></div>
               </div>
               <div className="mx-auto mt-7 w-[20%] min-h-[20px] bg-gray-300/50"></div>
            </div>
            <div className="flex">
               <div className=" flex flex-1 justify-center items-center h-[52px]">
                  <div className="w-7 h-7 rounded-[4px] bg-gray-300/50"></div>
               </div>
               <div className=" flex flex-1 justify-center items-center h-[52px]">
                  {" "}
                  <div className="w-7 h-7 rounded-[4px] bg-gray-300/50"></div>
               </div>
            </div>
         </div>
      );
   }
   return (
      <div>
         <Card
            // style={{ width: 300 }}

            cover={
               <Link href={`/product/${product._id}`}>
                  <a>
                     <img
                        alt={product.name}
                        src={product.image}
                        // src="https://res.cloudinary.com/dujzi1wfz/image/upload/v1630656715/eockwnedun8ujxyqizmr.png"
                        className=" w-full"
                        // style={{ maxHeight: "230px" }}
                     />
                     <div>
                        {/* <Image
                           alt={product.name}
                           // src={product.image}
                           src="https://res.cloudinary.com/dujzi1wfz/image/upload/v1630656715/eockwnedun8ujxyqizmr.png"
                           // className=" w-full"
                           layout="fill"
                           width={280}
                        /> */}
                     </div>
                  </a>
               </Link>
            }
            actions={[
               <ShoppingOutlined key="addCard" />,
               <Link href={`/product/${product._id}`} passHref key="detail">
                  <a>
                     {" "}
                     <SearchOutlined />
                  </a>
               </Link>,
            ]}
            hoverable
            className=" mt-7 border-4 border-gray-100" //sai marginTop thi tot hon bottom
         >
            <h3 className="min-h-[65px] text-[1.3rem]">{product.name}</h3>
            <article className="flex justify-between items-center">
               <div>
                  <Rate allowHalf disabled defaultValue={product.rating} />
               </div>
               <div className="mt-1"> {`${product.numReviews} reviews`}</div>
            </article>
            <h1 className="mt-3 text-center">$ {addDecimals(product.price)}</h1>
         </Card>
      </div>
   );
};

export default Product;
