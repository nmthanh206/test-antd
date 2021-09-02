import { Layout as Layout } from "antd";

import { ToastContainer } from "react-toastify";
const { Footer, Sider, Content } = Layout;
import Header from "./Header";

export default function Layout2({ children }) {
   return (
      <>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            // position="top-center"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
         />

         <Layout className="">
            <Header />
            <Layout hasSider>
               {false && <Sider className=" bg-blue-200">Sider</Sider>}
               <Content className="min-h-[81vh]">{children}</Content>
            </Layout>
            <Footer className="!bg-green-300">Footer</Footer>
         </Layout>
      </>
   );
}
