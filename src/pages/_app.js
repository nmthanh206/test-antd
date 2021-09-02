import "antd/dist/antd.less";
// import "@/styles/globals.less";
import "@/styles/tailwind.css";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { store } from "../store";
import { Provider } from "react-redux";
import Layout from "@/components/Layout";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            shared: {
               suspense: false,
            },
            queries: {
               refetchOnWindowFocus: false,
               retry: 1,
            },
         })
   );
   if (typeof window !== "undefined") {
      window.onload = () => {
         document.getElementById("holderStyle").remove();
      };
   }
   return (
      <>
         <QueryClientProvider client={queryClient}>
            <Provider store={store}>
               <Hydrate state={pageProps.dehydratedState}>
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               </Hydrate>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </>
   );
}

export default MyApp;
// useEffect(() => {
//    const removeFouc = (foucElement) => {
//       foucElement.className = foucElement.className.replace(
//          "no-fouc",
//          "fouc"
//       );
//    };
//    setTimeout(function () {
//       removeFouc(document.querySelector("body"));
//    }, 200);
// }, []);
