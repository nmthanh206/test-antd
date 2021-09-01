import React, { useState } from "react";
import { Affix, Badge, Layout, Menu, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import {
   AppstoreOutlined,
   UserOutlined,
   LogoutOutlined,
   ShoppingCartOutlined,
   FormOutlined,
   ReconciliationOutlined,
   TeamOutlined,
   ContactsOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu, Item } = Menu;
const { Search } = Input;
const Header2 = () => {
   const user = {};
   const router = useRouter();
   const numCart = 2;

   const [current] = useState([]);

   const logoutHandler = () => {};

   const onSearch = (keyword) => router.push(`/search/${keyword}`);
   return (
      <Affix>
         <Header>
            <Menu
               // onClick={handleClick}
               selectedKeys={[current]}
               mode="horizontal"
               theme="dark"
               className="px-20"
            >
               <Item key="HOME" icon={<AppstoreOutlined />}>
                  <Link href="/">HOME</Link>
                  {/* <div onClick={goHomeHandler}>HOME</div> */}
               </Item>
               <Item key="SEARCH">
                  <Search
                     placeholder="Find product"
                     allowClear
                     enterButton="Search"
                     size="middle"
                     onSearch={onSearch}
                  />
               </Item>

               <Item
                  key="CART"
                  icon={
                     <Badge count={numCart} offset={[0, -3]} size="small">
                        <ShoppingCartOutlined />
                     </Badge>
                  }
                  className="ml-auto"
               >
                  <Link href="/cart">CART</Link>
               </Item>

               <Item key=" SIGN IN" icon={<UserOutlined />}>
                  <Link href="/login"> SIGN IN</Link>
               </Item>

               {/* {user && (
                  <SubMenu
                     icon={<UserOutlined />}
                     // title={user?.name}
                     title="cu li"
                     key="USER"

                     // popupOffset={[1000, 5]}
                  >
                     <Item key="Profile" icon={<ContactsOutlined />}>
                        <Link href="/profile">Profile</Link>
                     </Item>
                     <Item key="Logout" icon={<LogoutOutlined />}>
                        <Link href="#" onClick={logoutHandler}>
                           Logout
                        </Link>
                     </Item>
                  </SubMenu>
               )} */}

               {user?.isAdmin && (
                  <SubMenu icon={<UserOutlined />} title="ADMIN" key="admin">
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
               )}
            </Menu>
         </Header>
      </Affix>
   );
};

export default Header2;
