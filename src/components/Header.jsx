import React, { useState } from "react";
import { Affix, Badge, Layout, Menu, AutoComplete, Button } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import {
   AppstoreOutlined,
   UserOutlined,
   LogoutOutlined,
   ShoppingCartOutlined,
   ContactsOutlined,
   SearchOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducers/userReducer";
import { resetCart } from "@/reducers/cartReducer";
import { useMounted } from "@/hook/useMounted";
import { useListNameProducts } from "@/hook/product";
import { deleteSearch, setListSearch } from "@/reducers/productReducer";
// import { useNextQueryParams } from "@/hook/useNextQueryParams";
const { Header } = Layout;
const { SubMenu, Item } = Menu;
const { Option } = AutoComplete;
const Header2 = () => {
   const { hasMounted } = useMounted();
   let stop = false;
   // const router = useNextQueryParams();
   const [options, setOptions] = useState([]);
   const [search, setSearch] = useState("");
   // const [open, setOpen] = useState(true);
   const { data: listNames } = useListNameProducts(!hasMounted);
   // const listNames = useSelector((state) => state.productList.listNameProduct);
   const router = useRouter();
   const user = useSelector((state) => state.userLogin.user);
   const listSearch = useSelector((state) => state.productList.listSearch);
   const userClient = hasMounted ? user : null;
   // const cartItems = useSelector((state) => state.cart.cartItems);
   const cartItems2 = useSelector((state) => state.cart.cartItems);
   const cartItems = hasMounted ? cartItems2 : [];
   const numCart = cartItems.reduce((acc, item) => acc + item.qty, 0);
   const dispatch = useDispatch();
   const [current, setCurrent] = useState([]);

   const logoutHandler = () => {
      setCurrent([]);
      dispatch(logout());
      dispatch(resetCart());
      router.push("/login");
   };
   const handleSearch = (value) => {
      let result = listNames.names.filter((nameProduct) =>
         nameProduct.name.toLowerCase().includes(value.toLowerCase())
      );
      result = result.map((pro) => pro.name);
      if (value) setOptions(result);
      else setOptions(listSearch);
      // setOptions(value ? result : []);
   };

   const onSelect = (keyword) => {
      if (keyword && !stop) {
         // setOpen(false);
         router.push(`/search/${keyword}`);
      } else setSearch("");
      stop = false;
   };

   const handleFocus = () => {
      //  console.log(listSearch);
      // const searchList = listSearch.map((search) => search.title);
      // setOpen(true);
      setOptions(listSearch);
   };
   const handleClickSearch = () => {
      if (!listSearch.includes(search))
         dispatch(setListSearch([...listSearch, { title: search }]));
      if (search) router.push(`/search/${search}`);
   };
   const handleDelete = (searchName) => {
      const listKeyword = listSearch.filter(
         (search) => search.title !== searchName
      );
      setOptions(listKeyword);
      // dispatch(deleteSearch(listKeyword));
      dispatch(deleteSearch(searchName));
      stop = true;
   };
   // const onSearch = (keyword) => router.push(`/search/${keyword}`);
   // const onSearch = (keyword) => router.push(`/?keyword=${keyword}`);
   // const onSearch = (keyword) => {
   //    if (keyword) router.push(`/search/${keyword}`);
   // };

   return (
      // <Affix className=" z-40">
      <Header>
         <Menu
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            className="flex px-20 3xl:px-[160px]"
         >
            <Item key="HOME" icon={<AppstoreOutlined />}>
               <Link href="/">HOME</Link>
            </Item>
            {/* <Item
                  key="WTF"
                  className=" flex-grow hover:!bg-transparent cursor-auto"
               ></Item> */}
            <Item
               key="SEARCH"
               className=" mx-auto hover:!bg-transparent cursor-default"
            >
               <div className="flex justify-center items-center w-full h-16">
                  {/* <Search
                        placeholder="Find product"
                        // allowClear  bug tu tim
                        allowClear
                        enterButton="Search"
                        size="middle"
                        onSearch={onSearch}
                        className="w-96"
                     /> */}
                  <div>
                     <AutoComplete
                        allowClear
                        // open={open}
                        dropdownMatchSelectWidth={252}
                        style={{ width: 400 }}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                        onChange={(data) => setSearch(data)}
                        onFocus={handleFocus}
                        placeholder="Find product"
                        value={search}
                     >
                        {options.map((nameProduct) => {
                           const searchName = nameProduct.title || nameProduct;
                           return (
                              <Option key={searchName} value={searchName}>
                                 <div className="flex items-center mt-[0.5px]">
                                    <Image
                                       src={
                                          nameProduct.title
                                             ? "/images/history.png"
                                             : "/images/search.png"
                                       }
                                       // src="/images/search.png"
                                       width={35}
                                       height={35}
                                       alt="search: "
                                    />
                                    {searchName}
                                    {nameProduct.title && (
                                       <div
                                          className="ml-auto"
                                          onClick={() =>
                                             handleDelete(searchName)
                                          }
                                       >
                                          <Image
                                             src="/images/delete.png"
                                             width={24}
                                             height={24}
                                             alt="delete"
                                          />
                                       </div>
                                    )}
                                 </div>
                              </Option>
                           );
                        })}
                     </AutoComplete>

                     <Button
                        type="primary"
                        onClick={handleClickSearch}
                        icon={<SearchOutlined />}
                        className="btn-search"
                     >
                        Search
                     </Button>
                  </div>
               </div>
            </Item>

            {/* <div className="flex-grow" key="SAOTRUNG"></div> */}
            {!userClient?.isAdmin && (
               <Item
                  key="CART"
                  icon={
                     <Badge count={numCart} offset={[0, -3]} size="small">
                        <ShoppingCartOutlined className=" text-gray-100" />
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
      // </Affix>
   );
};

export default Header2;
