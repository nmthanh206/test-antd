import { toast } from "react-toastify";
import { Input, Button, Form } from "antd";
import { useMutationForgotPassword } from "@/hook/user";
const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};
const tailLayout = {
   wrapperCol: { offset: 12, span: 6 },
};

const ForgotPasswordScreen = () => {
   const [form] = Form.useForm();

   const { mutate: forgotPassowrd, isLoading } = useMutationForgotPassword();

   const handleSubmit = async ({ email }) => {
      //
      forgotPassowrd({ email });
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };

   return (
      <div className=" pt-10 pr-14 pb-1 mx-auto mt-36 max-w-md bg-white">
         <center>
            <h2 className="mb-4">FORGOT PASSWORD</h2>
         </center>
         <Form
            name="basic"
            {...layout}
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            initialValues={{ email: "culi@example.com" }}
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
            <Item {...tailLayout}>
               <div className="flex justify-between items-center">
                  <Button
                     type="primary"
                     size="middle"
                     htmlType="submit"
                     loading={isLoading}
                  >
                     Continue
                  </Button>
               </div>
            </Item>
         </Form>
      </div>
   );
};

export default ForgotPasswordScreen;
