import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input, Button, Form } from "antd";
import Link from "next/link";
import { useMutationLoginUser } from "@/hook/user/useMutationLoginUser";

const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};
const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};
const tailLayout2 = {
   wrapperCol: { offset: 16, span: 8 },
};

const LoginScreen = ({ location, history }) => {
   const [form] = Form.useForm();
   const [buttonDisabled, setButtonDisabled] = useState(false);
   const redirect = "/";

   const user = {};
   const { mutate, isLoading } = useMutationLoginUser(history);

   useEffect(() => {
      if (user) {
      }
   }, [user, redirect, history]);

   const handleSubmit = async ({ email, password }) => {
      //
      mutate({ email, password });
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };
   const onChangeHandler = (e) => {
      const anyError = form
         .getFieldsError()
         .some((field) => field.errors.length > 0); //return true or false
      setButtonDisabled(anyError);
   };
   return (
      <div className=" pt-10 pr-14 pb-1 mx-auto mt-36 max-w-md bg-white">
         <center>
            <h2 className="mb-4">LOGIN</h2>
         </center>
         <Form
            name="basic"
            {...layout}
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{ email: "culi@example.com", password: "123456" }}
            onFieldsChange={onChangeHandler}
         >
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
                     disabled={buttonDisabled}
                     loading={isLoading}
                  >
                     Login
                  </Button>
                  <div>
                     New Customer?{" "}
                     <Link
                        href={
                           redirect
                              ? `/register?redirect=${redirect}`
                              : "/register"
                        }
                     >
                        Register
                     </Link>
                  </div>
               </div>
            </Item>
            <Item {...tailLayout2}>
               <div className="-mt-8">
                  <Link href="/forgotpassword">Forgot password</Link>
               </div>
            </Item>
         </Form>
      </div>
   );
};

export default LoginScreen;