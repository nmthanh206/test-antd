import React from "react";
import { Row, Col, Alert } from "antd";
// import Product from "../components/Product";
// import Loader from "../components/Loader";
import { useListProducts } from "@/hook/product/useListProducts";
import Product from "@/components/Product";
import Product2 from "@/model/productModel";

import dbConnect from "@/lib/dbConnect";

const Home = ({ products }) => {
   const keyword = "";
   let pageNumber = 1;

   if (pageNumber < 1) pageNumber = 1;
   // const data = {};
   const { data, isLoading, isError, error, isFetching } = useListProducts(
      {
         pageNumber,
         keyword,
      },
      products
   );

   // console.log(isFetching);
   // console.log(isLoading);
   // if (isLoading || !data)
   //    return (
   //       <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
   //          <Spin size="large" className=" spin" />
   //       </div>
   //    );

   if (isError)
      return (
         <div className="mx-auto">
            <Alert message={error.message} type="error" />
         </div>
      );

   return (
      <div className="">
         <div className="px-5">
            <Row gutter={16}>
               {(data.products || products).map((product) => (
                  <Col
                     key={product._id}
                     gutter={16}
                     sm={24}
                     md={12}
                     lg={8}
                     xl={6}
                     xs={24}
                  >
                     <Product product={product} />
                  </Col>
               ))}
            </Row>
         </div>
      </div>
   );
};
export default Home;
export async function getStaticProps(context) {
   await dbConnect();
   let data = await Product2.find({}); /* find all the data in our database */

   return {
      props: { products: JSON.parse(JSON.stringify(data)) }, // will be passed to the page component as props

      // revalidate: 30,
   };
}
