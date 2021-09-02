import React, { useEffect, useState } from "react";
import { Input, Button, Form, Row, Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { toast } from "react-toastify";
import { useMutationEditUser, useUserDetails } from "@/hook/user";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};
const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};
const UserEditScreen = () => {
   const router = useRouter();
   const userId = router.query.id;
   const [form] = Form.useForm();

   const infoAdmin = useSelector((state) => state.userLogin.user);

   const { data: userDetail, isLoading: isLoadingUserDetails } = useUserDetails(
      infoAdmin,
      userId
   );
   const [isAdmin, setIsAdmin] = useState(false);
   const { mutate: editUser, isLoading: isLoadingEditUser } =
      useMutationEditUser(infoAdmin, router);
   const handleSubmit = async ({ name, email }) => {
      const userEdit = { name, email, isAdmin, _id: userId };
      editUser({ infoAdmin, userEdit });
      //  alert(JSON.stringify(userEdit, null, 2));
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };
   useEffect(() => {
      setIsAdmin((userDetail && userDetail.isAdmin) || false);
   }, [userDetail]);

   useEffect(() => {
      if (!infoAdmin || !infoAdmin.isAdmin) {
         router.push("/login");
      }
   }, [infoAdmin, router]);
   if (isLoadingUserDetails)
      return (
         <div className="-mt-64">
            <Loader />
         </div>
      );

   return (
      <div className="mt-44">
         <Row>
            <Col span={10} offset={6}>
               <Form
                  name="basic"
                  {...layout}
                  form={form}
                  onFinish={handleSubmit}
                  onFinishFailed={onFinishFailed}
                  initialValues={{
                     name: userDetail && userDetail.name,
                     email: userDetail && userDetail.email,
                  }}
               >
                  <Item label="Name: " name="name" rules={[{ required: true }]}>
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
                  <Item label="Admin" name="admin">
                     <Checkbox
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                     />
                  </Item>
                  <Item {...tailLayout}>
                     <div className="flex justify-between items-center">
                        <Button
                           type="primary"
                           size="middle"
                           htmlType="submit"
                           //   disabled={buttonDisabled}
                           loading={isLoadingEditUser}
                        >
                           Update
                        </Button>
                     </div>
                  </Item>
               </Form>
            </Col>
         </Row>
      </div>
   );
};

export default UserEditScreen;
