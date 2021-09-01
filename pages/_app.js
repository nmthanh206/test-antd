import Layout from "@/components/Layout";
import "antd/dist/antd.less";
import "../styles/globals.less";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Head } from "next/head";
const queryClient = new QueryClient({
   shared: {
      suspense: false,
   },
   queries: {
      refetchOnWindowFocus: false,
      retry: 1,
   },
});
function MyApp({ Component, pageProps }) {
   // useEffect(() => {
   //    const removeFouc = (foucElement) => {
   //       foucElement.className = foucElement.className.replace(
   //          "no-fouc",
   //          "fouc"
   //       );
   //    };
   //    setTimeout(function () {
   //       removeFouc(document.querySelector("body"));
   //    }, 500);
   // }, []);

   if (typeof window !== "undefined") {
      window.onload = () => {
         document.getElementById("holderStyle").remove();
      };
   }
   return (
      <>
         <Layout hasSider>
            <QueryClientProvider client={queryClient}>
               <Component {...pageProps} />
               <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
         </Layout>
      </>
   );
}

export default MyApp;
