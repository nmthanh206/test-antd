import Layout from "@/components/Layout";
import "antd/dist/antd.less";
import "../styles/globals.less";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
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
   return (
      <Layout hasSider>
         <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
         ,
      </Layout>
   );
}

export default MyApp;
