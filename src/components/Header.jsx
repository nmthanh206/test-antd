import React, { useState } from "react";
import { Affix, Badge, Layout, Menu, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

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

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { resetCart } from "../reducers/cartReducer";
const { Header } = Layout;
const { SubMenu, Item } = Menu;
const { Search } = Input;
const Header2 = () => {
   const router = useRouter();
   const user = useSelector((state) => state.userLogin.user);
   const cartItems = useSelector((state) => state.cart.cartItems);
   const numCart = cartItems.reduce((acc, item) => acc + item.qty, 0);
   const dispatch = useDispatch();
   const [current, setCurrent] = useState([]);

   const logoutHandler = () => {
      setCurrent([]);
      dispatch(logout());
      dispatch(resetCart());
      router.push("/login");
   };

   const onSearch = (keyword) => router.push(`/search/${keyword}`);
   return (
      <Affix className="z-40">
         <Header>
            <Menu
               selectedKeys={[current]}
               mode="horizontal"
               theme="dark"
               className="flex px-20"
            >
               <Item key="HOME" icon={<AppstoreOutlined />}>
                  <Link href="/">HOME</Link>
               </Item>
               <Item
                  key="SEARCH"
                  className=" hover:!bg-transparent cursor-default"
               >
                  <div className="flex justify-center items-center w-full h-16">
                     <Search
                        placeholder="Find product"
                        // allowClear  bug tu tim
                        enterButton="Search"
                        size="middle"
                        onSearch={onSearch}
                        className="w-96"
                     />
                  </div>
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
               {!user && (
                  <Item key=" SIGN IN" icon={<UserOutlined />}>
                     <Link href="/login"> SIGN IN</Link>
                  </Item>
               )}
               {user && (
                  <SubMenu
                     icon={<UserOutlined />}
                     title={user?.name}
                     key="USER"

                     // popupOffset={[1000, 5]}
                  >
                     <Item key="Profile" icon={<ContactsOutlined />}>
                        <Link href="/profile">Profile</Link>
                     </Item>
                     <Item
                        key="Logout"
                        icon={<LogoutOutlined />}
                        onClick={logoutHandler}
                     >
                        Logout
                     </Item>
                  </SubMenu>
               )}

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
