import { Button, Input, Layout } from "antd";
import { Spin } from "antd";
// import Header2 from "../components/Header";
const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
   return (
      <div className="h-screen bg-gray-50">
         <Layout className="h-full">
            <Sider className=" bg-blue-200">Sider</Sider>
            <Layout>
               <Header className=" bg-orange-200">Header</Header>
               <Content className=" h-full">
                  Content <Spin size="large" />
                  <Input placeholder="Basic usage" className=" !w-32" />
                  <Button type="primary" className=" ml-10 w-36 h-12">
                     hello
                  </Button>
               </Content>
               <Footer className="!bg-green-300">Footer</Footer>
            </Layout>
         </Layout>
         {/* <Header2 /> */}
      </div>
   );
}
