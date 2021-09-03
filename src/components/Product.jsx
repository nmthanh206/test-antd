/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card } from "antd";
import { SearchOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import Link from "next/link";
import Image from "next/image";
const Product = ({ product }) => {
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };
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
