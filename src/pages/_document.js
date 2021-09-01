import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
   }

   render() {
      return (
         <Html>
            <Head>
               {typeof window === "undefined" && (
                  <style
                     id="holderStyle"
                     dangerouslySetInnerHTML={{
                        __html: `
         *, *::before, *::after {
           transition: none !important;
         }
         `,
                     }}
                  />
               )}
            </Head>
            {/* <body className="no-fouc"> */}
            <body>
               {/* <script>0</script> */}
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}

export default MyDocument;
