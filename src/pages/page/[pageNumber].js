import { useRouter } from "next/router";
import { Row, Col, Pagination, Alert } from "antd";
import Product from "@/components/Product";
import Loader from "@/components/Loader";
import { useListProducts } from "@/hook/product/useListProducts";
import ProductCarousel from "@/components/ProductCarousel";
import dbConnect from "@/lib/dbConnect";
import Product2 from "server/models/productModel";
const HomeScreen = ({ products }) => {
   const router = useRouter();
   const keyword = router.query.keyword;
   let pageNumber = router.query.pageNumber || 1;

   if (pageNumber < 1) pageNumber = 1;
   const { data, isLoading, isError, error } = useListProducts(
      {
         pageNumber,
         keyword,
      },
      products
   );
   if (isLoading || !data)
      return (
         <div className="-mt-36">
            <Loader />
         </div>
      );

   if (isError)
      return (
         <div className="mx-auto">
            <Alert message={error.message} type="error" />
         </div>
      );

   return (
      <div className="">
         <Row>
            <Col span={24}>
               {!keyword ? (
                  <ProductCarousel />
               ) : (
                  <h1>
                     Search results for '{keyword}' : {data.total} results
                  </h1>
               )}
            </Col>
         </Row>
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
         <Row>
            <Col md={20} xs={24} offset={3}>
               <div className="flex justify-center items-center mt-6 mr-24">
                  <Pagination
                     defaultCurrent={1}
                     responsive
                     current={Number(pageNumber)}
                     total={(data || products).total}
                     pageSize={data?.pageSize || 8}
                     // eslint-disable-next-line no-unused-vars
                     onChange={(page, pageSize) => router.push(`/page/${page}`)}
                     showQuickJumper
                     showTotal={(total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`
                     }
                  />
               </div>
            </Col>
         </Row>
      </div>
   );
};
export default HomeScreen;
export async function getStaticProps(context) {
   await dbConnect();
   let data = await Product2.find({});

   return {
      props: { products: JSON.parse(JSON.stringify(data)) },

      // revalidate: 30,
   };
}
