import { useRouter } from "next/router";
import { Row, Col, Pagination, Alert } from "antd";
import Product from "@/components/Product";
import { useListProducts } from "@/hook/product/useListProducts";
import { useEffect } from "react";

const HomeScreen = () => {
   const router = useRouter();

   const keyword = router.query.keyword || "";
   let pageNumber = router.query.pageNumber || 1;

   if (pageNumber < 1) pageNumber = 1;

   const { data, isLoading, isError, error } = useListProducts({
      pageNumber,
      keyword,
   });

   useEffect(() => {
      if (typeof window !== "undefined") {
         if (pageNumber > data?.pages)
            router.push(`/search/${keyword}?pageNumber=${data?.pages}`);
      }
   }, [data?.pages, keyword, pageNumber, router]);

   if (isError)
      return (
         <div className="mx-auto">
            <Alert message={error.message} type="error" />
         </div>
      );

   return (
      <div>
         {/* {hasMounted && ( */}
         <div className="">
            <Row>
               <Col span={24}>
                  <h1 className="m-0 mt-2 ml-5 text-3xl">
                     Search results for '{keyword}' : {data?.total} results
                  </h1>
               </Col>
            </Row>
            <div className="px-5">
               <Row gutter={16}>
                  {(data?.products || [1, 2, 3, 4, 5, 6, 7, 8]).map(
                     (product) => (
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
                     )
                  )}
               </Row>
            </div>
            <Row>
               <Col md={20} xs={24} offset={3}>
                  <div className="flex justify-center items-center mt-6 mr-24">
                     {!isLoading && data && (
                        <Pagination
                           defaultCurrent={1}
                           responsive
                           current={Number(pageNumber)}
                           total={data.total}
                           pageSize={data?.pageSize || 8}
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
         {/* )} */}
      </div>
   );
};
export default HomeScreen;
