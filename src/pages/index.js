import { useRouter } from "next/router";
import { Row, Col, Pagination, Alert } from "antd";
import Product from "@/components/Product";
import { useListProducts } from "@/hook/product/useListProducts";
import ProductCarousel from "@/components/ProductCarousel";
import { useEffect } from "react";
import { useTopProducts } from "@/hook/product";
import { useNextQueryParams } from "@/hook/useNextQueryParams";

// import dbConnect from "@/lib/dbConnect";
// import Product2 from "@/models/productModel";

const HomeScreen = () => {
   // const router = useRouter();
   const router = useNextQueryParams();
   const keyword = router.query.keyword || "";
   let pageNumber = router.query.pageNumber || 1;

   if (pageNumber < 1) pageNumber = 1;

   const { data: productTopRated, isLoading: isLoadingTop } =
      useTopProducts(keyword);
   const { data, isLoading, isError, error } = useListProducts({
      pageNumber,
      keyword,
   });

   useEffect(() => {
      if (typeof window !== "undefined") {
         if (router.isReady && data?.page > data?.pages)
            router.push(`/?keyword=${keyword}&pageNumber=${data?.pages}`);
         // setEnabled(true);
      }
   }, [data?.page, data?.pages, keyword, router]);

   // if (isLoading || !data)
   //    return (
   //       <div className="-mt-36">
   //          <Loader />
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
         <Row>
            <Col span={24}>
               {Boolean(keyword) ? (
                  <h1 className="m-0 mt-2 ml-5 text-3xl">
                     Search results for '{keyword}' : {data?.total} results
                  </h1>
               ) : (
                  <ProductCarousel
                     productTopRated={productTopRated}
                     isLoading={isLoadingTop}
                  />
               )}
            </Col>
         </Row>
         <div className="px-5">
            <Row gutter={16}>
               {(data?.products || [1, 2, 3, 4, 5, 6, 7, 8]).map((product) => (
                  <Col
                     key={product._id || product}
                     gutter={16}
                     sm={24}
                     md={12}
                     lg={8}
                     xl={6}
                     xs={24}
                  >
                     <Product product={product} isLoading={isLoading} />
                  </Col>
               ))}
            </Row>
         </div>
         <Row>
            <Col md={20} xs={24} offset={3}>
               <div className="flex justify-center items-center pt-5 pb-10 mt-6 mr-24">
                  {!isLoading && (
                     <Pagination
                        defaultCurrent={1}
                        responsive
                        current={Number(pageNumber)}
                        total={data.total}
                        pageSize={data?.pageSize || 8}
                        // onChange={(page, pageSize) => router.push(`/page/${page}`)}
                        // eslint-disable-next-line no-unused-vars
                        onChange={(page, pageSize) =>
                           router.push(`/?pageNumber=${page}`)
                        }
                        showQuickJumper
                        showTotal={(total, range) =>
                           `${range[0]}-${range[1]} of ${total} items`
                        }
                     />
                  )}
               </div>
            </Col>
         </Row>
      </div>
   );
};
export default HomeScreen;

// export async function getStaticProps(context) {
//    await dbConnect();
//    let data = await Product2.find({});

//    return {
//       props: { products: JSON.parse(JSON.stringify(data)) },

//       // revalidate: 30,
//    };
// }
