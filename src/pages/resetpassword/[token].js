import React from "react";
import { toast } from "react-toastify";
import { Input, Button, Form } from "antd";
import { useMutationResetPassword } from "@/hook/user";
import { useRouter } from "next/router";
const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};
const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};
const ResetPasswordScreen = ({ match }) => {
   const rounter = useRouter();
   const { token } = rounter.query;
   const [form] = Form.useForm();

   const { mutate: resetPassowrd, isLoading } = useMutationResetPassword();

   const handleSubmit = async ({ password, confirmPassword }) => {
      if (password !== confirmPassword) {
         toast.error("Passwords do not match");
      } else {
         resetPassowrd({ password, token });
      }
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };
   return (
      <div className=" pt-10 pr-14 pb-1 mx-auto mt-36 max-w-md bg-white">
         <center>
            <h2 className="mb-4 ml-20">RESET PASSWORD</h2>
         </center>
         <Form
            name="basic"
            {...layout}
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{
               password: "123456",
               confirmPassword: "123456",
            }}
         >
            <Item
               label="Password: "
               name="password"
               rules={[{ required: true }]}
            >
               <Input.Password />
            </Item>
            <Item
               label="Confirm Password: "
               name="confirmPassword"
               rules={[{ required: true }]}
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
                     Reset password
                  </Button>
               </div>
            </Item>
         </Form>
      </div>
   );
};

export default ResetPasswordScreen;
