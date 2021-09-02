import { Col, Row, Form, Input, Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutationUpdateUserProfile } from "@/hook/user";
import TableMyOrders from "@/components/TableMyOrders";
const { Item } = Form;
const layout = {
   labelCol: { span: 24 },
   wrapperCol: { span: 24 },
};
const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};

const ProfileScreen = () => {
   const [form] = Form.useForm();
   const user = useSelector((state) => state.userLogin.user);
   const { mutate: updateUserProfile, isLoading } =
      useMutationUpdateUserProfile();
   const handleSubmit = async ({ name, email, password, confirmPassword }) => {
      //

      if (password !== confirmPassword) {
         toast.error("Passwords do not match");
      } else {
         const userInfo = user;
         const userUpdate = { id: user._id, name, email, password };
         updateUserProfile({ userInfo, userUpdate });
         // toast.info("Update User Profile Successfully");
      }
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };

   if (user)
      return (
         <div className="mt-7">
            <Row gutter={32}>
               <Col span={6}>
                  <div className="p-5 ml-5 border-2 border-gray-100 border-solid">
                     <Form
                        name="basic"
                        {...layout}
                        form={form}
                        onFinish={handleSubmit}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                           name: user.name,
                           email: user.email,
                           password: "",
                           confirmPassword: "",
                        }}
                     >
                        <Item
                           label="Name: "
                           name="name"
                           rules={[{ required: true }]}
                        >
                           <Input />
                        </Item>
                        <Item
                           label="Email: "
                           name="email"
                           rules={[
                              {
                                 type: "email",
                              },
                              { required: true },
                           ]}
                        >
                           <Input />
                        </Item>
                        <Item
                           label="Password: "
                           name="password"
                           // rules={[{ required: true }]}
                        >
                           <Input.Password />
                        </Item>
                        <Item
                           label="Confirm Password: "
                           name="confirmPassword"
                           // rules={[{ required: true }]}
                        >
                           <Input.Password />
                        </Item>

                        <Item {...tailLayout}>
                           <div className="flex justify-between items-center">
                              <Button
                                 type="primary"
                                 size="middle"
                                 htmlType="submit"
                                 loading={isLoading}
                              >
                                 Update
                              </Button>
                           </div>
                        </Item>
                     </Form>
                  </div>
               </Col>
               <Col span={18}>
                  <div className=" mr-5 border-2 border-gray-100 border-solid">
                     <TableMyOrders userInfo={user} />
                  </div>
               </Col>
            </Row>
         </div>
      );
};

export default ProfileScreen;
