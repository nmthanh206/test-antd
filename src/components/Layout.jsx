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

const { SubMenu, Item } = Menu;
const { Content, Footer, Sider } = Layout;
export default function Layout2({ children }) {
   const user = useSelector((state) => state.userLogin.user);
   // const dispatch = useDispatch();
   // useEffect(() => {
   //    if (typeof window !== "undefined") {
   //       dispatch(
   //          loginUser(
   //             localStorage.getItem("userInfo")
   //                ? JSON.parse(localStorage.getItem("userInfo"))
   //                : null
   //          )
   //       );
   //    }
   // }, []);
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
               {user && user.isAdmin && (
                  <Sider className=" site-layout-background" width={200}>
                     <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%" }}
                     >
                        <SubMenu
                           icon={<UserOutlined />}
                           title="Resources"
                           key="admin"
                        >
                           <Item key="Users" icon={<TeamOutlined />}>
                              <Link href="/admin/userlist">Users</Link>
                           </Item>
                           <Item key="Products" icon={<FormOutlined />}>
                              <Link href="/admin/productlist">Products</Link>
                           </Item>
                           <Item key="Orders" icon={<ReconciliationOutlined />}>
                              <Link href="/admin/orderlist">Orders</Link>
                           </Item>
                        </SubMenu>
                     </Menu>
                  </Sider>
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
