/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";

// import ImageZoom from "js-image-zoom";
import ImageZoom from "./ImageZoom2";
const ReactImageZoom = ({ src, alt }) => {
   // const container = useRef(null);

   useEffect(() => {
      const options = {
         scale: 0.3,
         // width: 600,
         // height: 450,
         fillContainer: true,
         // outSrc: {
         //    src: "https://salt.tikicdn.com/ts/review/37/58/68/1dfc25930ebf1fab5d9e1c19248e11fa.jpg",
         //    width: 600,
         //    height: 450,
         // },
      };
      const container = document.getElementById("img-container");
      new ImageZoom(container, options);
   }, []);
   return (
      // phai sai id="img-container" bac buoc
      <div id="img-container">
         <img
            // src="https://salt.tikicdn.com/cache/400x400/ts/review/37/58/68/1dfc25930ebf1fab5d9e1c19248e11fa.jpg.webp"
            src={src}
            alt={alt}
            id="imagezoom"
         />
         <div className="js-image-zoom__zoomed-area"></div>
         <div
            className="js-image-zoom__zoomed-image"
            style={{ backgroundImage: `url(${src})` }}

            // style={{
            //    backgroundImage: `url(https://salt.tikicdn.com/ts/review/37/58/68/1dfc25930ebf1fab5d9e1c19248e11fa.jpg)`,
            // }}
         ></div>
      </div>
   );
};

export default ReactImageZoom;
// import React, { useEffect, useRef, useState } from "react";

// // import ImageZoom from "js-image-zoom";
// import ImageZoom from "./ImageZoom2";
// const ReactImageZoom = ({ src, alt }) => {
//    let img, lens, result;
//    const [cx, setCx] = useState(0);
//    const [cy, setCy] = useState(0);

//    const getCursorPos = (e) => {
//       let a,
//          x = 0,
//          y = 0;
//       e = e || window.event;

//       a = img.getBoundingClientRect();

//       x = e.pageX - a.left;
//       y = e.pageY - a.top;

//       x = x - window.pageXOffset;
//       y = y - window.pageYOffset;
//       return { x: x, y: y };
//    };

//    const image = useRef(null);
//    const lensZoom = useRef(null);
//    const imageZoomed = useRef(null);
//    const moveLens = (e) => {
//       img = image.current;
//       result = imageZoomed.current;
//       lens = lensZoom.current;
//       let pos, x, y;
//       lens.style.display = "block";
//       e.preventDefault();
//       pos = getCursorPos(e);

//       x = pos.x - lens.offsetWidth / 2;
//       y = pos.y - lens.offsetHeight / 2;

//       if (x > img.width - lens.offsetWidth) {
//          x = img.width - lens.offsetWidth;
//       }
//       if (x < 0) {
//          x = 0;
//       }
//       if (y > img.height - lens.offsetHeight) {
//          y = img.height - lens.offsetHeight;
//       }
//       if (y < 0) {
//          y = 0;
//       }

//       lens.style.left = x + "px";
//       lens.style.top = y + "px";

//       result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
//       result.style.backgroundSize =
//          img.offsetWidth * cx + "px " + img.offsetHeight * cy + "px";
//    };

//    useEffect(() => {
//       img = image.current;
//       result = imageZoomed.current;
//       lens = lensZoom.current;

//       result.style.width = lens.offsetWidth * 2.7 + "px";
//       result.style.height = lens.offsetWidth * 3 + "px";
//       setCx(result.offsetWidth / lens.offsetWidth);
//       setCy(result.offsetHeight / lens.offsetHeight);
//       // cx = result.offsetWidth / lens.offsetWidth;
//       // cy = result.offsetHeight / lens.offsetHeight;

//       if (typeof window !== "undefined") {
//          lens.addEventListener("onmouseenter", () => {
//             lens.style.display = "block";
//             // result.style.backgroundImage = `url(${src})`;
//          });
//          lens.addEventListener("mouseleave", () => {
//             lens.style.display = "none";
//             // result.style.backgroundImage = "none";
//          });

//          // lens.addEventListener("mousemove", moveLens);
//          // img.addEventListener("mousemove", moveLens);
//       }
//       lens.style.display = "none";
//    }, []);
//    return (
//       <div className=" img-zoom-container">
//          <div>
//             <img
//                ref={image}
//                src={src}
//                alt={alt}
//                className=" !w-[98%] imageProduct"
//                onMouseMove={moveLens}
//             />
//          </div>
//          <div
//             className="img-zoom-lens"
//             ref={lensZoom}
//             onMouseMove={moveLens}
//          ></div>
//          <div
//             className="img-zoom-result"
//             ref={imageZoomed}
//             style={{ backgroundImage: `url(${src})` }}
//          ></div>
//       </div>
//    );
// };

// export default ReactImageZoom;
