import { Layout, Menu } from "antd";

import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Container from "./Container";
import { useSelector } from "react-redux";

import {
   UserOutlined,
   TeamOutlined,
   FormOutlined,
   ReconciliationOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useMounted } from "@/hook/useMounted";
import { useRouter } from "next/router";

const { SubMenu, Item } = Menu;
const { Content, Footer, Sider } = Layout;
export default function Layout2({ children }) {
   const { hasMounted } = useMounted();
   const rounter = useRouter();
   console.log(rounter.asPath);
   const user = useSelector((state) => state.userLogin.user);
   const userClient = hasMounted ? user : null;

   return (
      <>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            // position="top-center"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
         />

         <Layout>
            <Header />

            <Layout hasSider>
               {userClient && userClient.isAdmin ? (
                  <Sider
                     // className=" shadow-lg site-layout-background"
                     // eslint-disable-next-line tailwindcss/no-contradicting-classname
                     className=" bg-[#97cdfc] border-[.5px] border-blue-300 border-solid shadow-lg"
                     width={200}
                     // collapsed
                  >
                     <div className="fixed w-[200px]">
                        <Menu
                           mode="inline"
                           selectedKeys={
                              rounter.asPath.startsWith("/admin")
                                 ? rounter.asPath.split("/")[2]
                                 : []
                           }
                           // defaultSelectedKeys={["1"]}
                           // defaultOpenKeys={["sub1"]}
                           // style={{ height: "100%" }}
                        >
                           {/* <SubMenu
                              icon={<UserOutlined />}
                              title="Resources"
                              key="admin"
                           > */}
                           <Item key="userlist" icon={<TeamOutlined />}>
                              <Link href="/admin/userlist">Users</Link>
                           </Item>
                           <Item key="productlist" icon={<FormOutlined />}>
                              <Link href="/admin/productlist">Products</Link>
                           </Item>
                           <Item
                              key="orderlist"
                              icon={<ReconciliationOutlined />}
                           >
                              <Link href="/admin/orderlist">Orders</Link>
                           </Item>
                           {/* </SubMenu> */}
                        </Menu>
                     </div>
                  </Sider>
               ) : (
                  <div />
               )}
               <Content className="">
                  <Container>{children} </Container>
               </Content>
            </Layout>

            <Footer className="!bg-green-300">Footer</Footer>
         </Layout>
      </>
   );
}
