import React, { useState, useEffect } from "react";
import { Affix, Badge, Layout, Menu, Input } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

import {
   AppstoreOutlined,
   UserOutlined,
   LogoutOutlined,
   ShoppingCartOutlined,
   ContactsOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/userReducer";
import { resetCart } from "@/reducers/cartReducer";
import { useMounted } from "@/hook/useMounted";
const { Header } = Layout;
const { SubMenu, Item } = Menu;
const { Search } = Input;

const Header2 = () => {
   const { hasMounted } = useMounted();
   const router = useRouter();
   const user = useSelector((state) => state.userLogin.user);
   const cartItems = useSelector((state) => state.cart.cartItems);
   const numCart = cartItems.reduce((acc, item) => acc + item.qty, 0);
   const dispatch = useDispatch();
   const [current, setCurrent] = useState([]);
   const userClient = hasMounted ? user : null;
   const logoutHandler = () => {
      setCurrent([]);
      dispatch(logout());
      dispatch(resetCart());
      router.push("/login");
   };

   // const onSearch = (keyword) => router.push(`/search/${keyword}`);
   // const onSearch = (keyword) => router.push(`/?keyword=${keyword}`);
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
               <div className="flex-grow"></div>
               {!userClient?.isAdmin && (
                  <Item
                     key="CART"
                     icon={
                        <Badge count={numCart} offset={[0, -3]} size="small">
                           <ShoppingCartOutlined />
                        </Badge>
                     }
                     // className="ml-auto"
                  >
                     <Link href="/cart">CART</Link>
                  </Item>
               )}

               {userClient ? (
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
               ) : (
                  <Item key=" SIGN IN" icon={<UserOutlined />}>
                     <Link href="/login"> SIGN IN</Link>
                  </Item>
               )}
            </Menu>
         </Header>
      </Affix>
   );
};

export default Header2;
