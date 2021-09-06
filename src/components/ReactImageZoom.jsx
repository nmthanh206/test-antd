/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useRef } from "react";

// // import ImageZoom from "js-image-zoom";
// import ImageZoom from "./ImageZoom2";
// const ReactImageZoom = ({ src, alt }) => {
//    // const container = useRef(null);

//    useEffect(() => {
//       const options = {
//          scale: 0.3,
//          // width: 600,
//          // height: 450,
//          fillContainer: true,
//          // outSrc: {
//          //    src: "https://salt.tikicdn.com/ts/review/37/58/68/1dfc25930ebf1fab5d9e1c19248e11fa.jpg",
//          //    width: 600,
//          //    height: 450,
//          // },
//       };
//       const container = document.getElementById("img-container");
//       new ImageZoom(container, options);
//    }, []);
//    return (
//       // phai sai id="img-container" bac buoc
//       <div id="img-container">
//          <img
//             // src="https://salt.tikicdn.com/cache/400x400/ts/review/37/58/68/1dfc25930ebf1fab5d9e1c19248e11fa.jpg.webp"
//             src={src}
//             alt={alt}
//             id="imagezoom"
//          />
//          <div className="js-image-zoom__zoomed-area"></div>
//          <div
//             className="js-image-zoom__zoomed-image"
//             style={{ backgroundImage: `url(${src})` }}

//             // style={{
//             //    backgroundImage: `url(https://salt.tikicdn.com/ts/review/37/58/68/1dfc25930ebf1fab5d9e1c19248e11fa.jpg)`,
//             // }}
//          ></div>
//       </div>
//    );
// };

// export default ReactImageZoom;
import React, { useEffect, useRef } from "react";

const ReactImageZoom = ({ src, alt, srcOrigin }) => {
   const image = useRef(null);
   const zoomImage = useRef(null);
   const zoomLens = useRef(null);
   const container = useRef(null);
   let cx, cy;
   function getCursorPos(e) {
      let a,
         x = 0,
         y = 0;
      e = e || window.event;
      a = image.current.getBoundingClientRect();
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x, y };
   }
   function moveLens(e) {
      // zoomLens.current.style.display = "block";
      let pos, x, y;

      e.preventDefault();

      pos = getCursorPos(e);

      x = pos.x - zoomLens.current.offsetWidth / 2;
      y = pos.y - zoomLens.current.offsetHeight / 2;

      if (x > image.current.width - zoomLens.current.offsetWidth) {
         x = image.current.width - zoomLens.current.offsetWidth;
      }
      if (x < 0) {
         x = 0;
      }
      if (y > image.current.height - zoomLens.current.offsetHeight) {
         y = image.current.height - zoomLens.current.offsetHeight;
      }
      if (y < 0) {
         y = 0;
      }

      zoomLens.current.style.left = x + "px";
      zoomLens.current.style.top = y + "px";

      zoomImage.current.style.backgroundPosition =
         "-" + x * cx + "px -" + y * cy + "px";
   }

   useEffect(() => {
      function handleMouseEnter() {
         zoomLens.current.style.display = "block";
         zoomImage.current.style.display = "block";
      }
      function handleMouseLeave() {
         zoomLens.current.style.display = "none";
         zoomImage.current.style.display = "none";
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      cx = zoomImage.current.offsetWidth / zoomLens.current.offsetWidth;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cy = zoomImage.current.offsetHeight / zoomLens.current.offsetHeight;

      // zoomImage.current.style.backgroundImage = "url('" + src + "')";
      // zoomImage.current.style.backgroundSize = `
      // ${image.current.width * cx}px ${image.current.height * cy}px`;

      // zoomImage.current.style.backgroundSize = `
      // ${image.current.width * cx}px ${image.current.height * cy}px`;
      zoomImage.current.style.backgroundSize = `
      ${image.current.width * cx}px ${image.current.height * cy}px`;
      zoomLens.current.style.display = "none";
      zoomImage.current.style.display = "none";
      container.current.addEventListener("mousemove", moveLens);
      container.current.addEventListener("mouseenter", handleMouseEnter);
      container.current.addEventListener("mouseleave", handleMouseLeave);
   }, []);
   return (
      <div className=" img-zoom-container" ref={container}>
         <div className="img-zoom-lens" ref={zoomLens}></div>
         <img
            ref={image}
            src={src}
            alt={alt}
            className=" w-[590px] h-[460px]"
            // className="max-w-[590px] max-h-[590px]"
         />

         <div
            className="img-zoom-result"
            ref={zoomImage}
            style={{ backgroundImage: `url(${srcOrigin ? srcOrigin : src})` }}
         ></div>
      </div>
   );
};

export default ReactImageZoom;
