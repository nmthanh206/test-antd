import { Affix, Badge, Layout, Menu, Input } from "antd";

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
import { renderOnlyOnClient } from "../Util/renderOnlyOnClient";

const { Header } = Layout;
const { SubMenu, Item } = Menu;
const { Search } = Input;
const Header2 = () => {
   //    const [current, setCurrent] = useState([]);
   const user = {};
   const onSearch = (keyword) => keyword;
   return (
      <Affix>
         <Header>
            <Menu
               // onClick={handleClick}
               selectedKeys={[1]}
               mode="horizontal"
               theme="dark"
               className="px-20 colorHeader"
            >
               <Item key="HOME" icon={<AppstoreOutlined />}>
                  <a to="/">HOME</a>
                  {/* <div onClick={goHomeHandler}>HOME</div> */}
               </Item>
               <Item key="SEARCH" className="hover:!bg-[#4c4d57]">
                  <div className=" flex justify-center items-center w-full h-full">
                     <Search
                        placeholder="Find product"
                        allowClear
                        enterButton="Search"
                        size="middle"
                        onSearch={onSearch}
                     />
                  </div>
               </Item>

               <Item
                  key="CART"
                  icon={
                     <Badge count={4} offset={[0, -3]} size="small">
                        <ShoppingCartOutlined />
                     </Badge>
                  }
                  className="ml-auto"
               >
                  <a to="/cart">CART</a>
               </Item>

               <Item key=" SIGN IN" icon={<UserOutlined />}>
                  SIGN IN
                  <a to="/login"></a>
               </Item>

               <SubMenu
                  icon={<UserOutlined />}
                  title={user?.name}
                  key="USER"

                  // popupOffset={[1000, 5]}
               >
                  <Item key="Profile" icon={<ContactsOutlined />}>
                     <a to="/profile">Profile</a>
                  </Item>
                  <Item key="Logout" icon={<LogoutOutlined />}>
                     <a to="#">Logout</a>
                  </Item>
               </SubMenu>

               <SubMenu icon={<UserOutlined />} title="ADMIN" key="admin">
                  <Item key="Users" icon={<TeamOutlined />}>
                     <a to="/admin/userlist">Users</a>
                  </Item>
                  <Item key="Products" icon={<FormOutlined />}>
                     <a to="/admin/productlist">Products</a>
                  </Item>
                  <Item key="Orders" icon={<ReconciliationOutlined />}>
                     <a to="/admin/orderlist">Orders</a>
                  </Item>
               </SubMenu>
            </Menu>
         </Header>
         <div className="mt-32 ml-[100px] bg-blue-200">hello</div>
      </Affix>
   );
};

export default renderOnlyOnClient(Header2);
