import React, { useState } from "react";
import { toast } from "react-toastify";
import { Input, Button, Form } from "antd";
import Link from "next/link";
import { useMutationRegisterUser } from "@/hook/user";
import { useRouter } from "next/router";
const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};
const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};

const RegisterScreen = () => {
   const router = useRouter();
   const [form] = Form.useForm();
   const [buttonDisabled, setButtonDisabled] = useState(false);
   const redirect =
      Object.keys(router.query).length !== 0
         ? router.asPath.split("=")[1]
         : "/";

   const { mutate, isLoading } = useMutationRegisterUser(router, redirect);

   //
   const handleSubmit = async ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
         toast.error("Passwords do not match");
      } else {
         mutate({ name, email, password });
      }
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
            <h2 className="mb-4">REGISTER</h2>
         </center>
         <Form
            className="ml-1"
            name="basic"
            {...layout}
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{
               name: "test",
               email: "test@example.com",
               password: "123456",
               confirmPassword: "123456",
            }}
            onFieldsChange={onChangeHandler}
         >
            <Item label="Name" name="name" rules={[{ required: true }]}>
               <Input />
            </Item>
            <Item
               label="Email"
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
            <Item label="Password" name="password" rules={[{ required: true }]}>
               <Input.Password />
            </Item>
            <Item
               label="Confirm Password"
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
                     disabled={buttonDisabled}
                     loading={isLoading}
                  >
                     Register
                  </Button>
                  <div>
                     Have an Account?{" "}
                     <Link
                        href={
                           redirect ? `/login?redirect=${redirect}` : "/login"
                        }
                     >
                        Login
                     </Link>
                  </div>
               </div>
            </Item>
         </Form>
      </div>
   );
};

export default RegisterScreen;
