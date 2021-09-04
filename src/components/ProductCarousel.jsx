import { Carousel, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTopProducts } from "@/hook/product";
import React from "react";

// eslint-disable-next-line no-unused-vars
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
   <LeftOutlined {...props} />
);
// eslint-disable-next-line no-unused-vars
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
   <RightOutlined {...props} />
);

const ProductCarousel = ({ productTopRated, isLoading }) => {
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };
   if (isLoading)
      return (
         <div className="flex flex-col justify-between items-center h-80 animate-pulse">
            <div className="mt-3 w-[20%] h-7 rounded bg-gray-300/50"></div>
            <div className="w-[300px] h-[240px] rounded-[20%] bg-gray-300/50"></div>
            <div className="w-40 h-4 rounded bg-gray-300/50"></div>
         </div>
      );
   return (
      <div className=" mt-2">
         <Carousel
            autoplay
            // autoplaySpeed={2000}
            pauseOnHover={false}
            arrows
            prevArrow={<SlickArrowLeft />}
            nextArrow={<SlickArrowRight />}
            infinite
            className="bg-gradient-to-r from-gray-500 to-gray-300 colorCarousel"
         >
            {productTopRated.map((product) => (
               // khong dc bo key vo div bo
               <React.Fragment key={product._id}>
                  <div className="flex flex-col justify-between items-center mt-3">
                     <h1 className="text-[1.3rem] text-gray-50">
                        {product.name} $ {addDecimals(product.price)}
                     </h1>
                     <Image
                        src={product.image}
                        alt={product.image}
                        className="cursor-pointer"
                        width={300}
                        height={250}
                     />
                  </div>
               </React.Fragment>
            ))}
         </Carousel>
      </div>
   );
};

export default ProductCarousel;
