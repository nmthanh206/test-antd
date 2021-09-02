import {
   LoadingOutlined,
   PoundCircleOutlined,
   SmileOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row, Steps, Form } from "antd";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { saveShippingAddress } from "@/reducers/cartReducer";
import { useRouter } from "next/router";
const { Step } = Steps;
const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 },
};

const ShippingScreen = () => {
   const router = useRouter();
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const shippingHandler = () => {
      const { address, city, postalCode, country } = form.getFieldValue();
      dispatch(saveShippingAddress({ address, city, postalCode, country }));
      router.push("/payment");
   };

   return (
      <Row className="mt-9">
         <Col span={24}>
            <Steps className="px-16">
               <Step status="finish" title="Login" icon={<UserOutlined />} />
               <Step
                  status="process"
                  title="Shipping"
                  icon={<LoadingOutlined />}
               />
               <Step
                  status="wait"
                  title="Payment"
                  icon={<PoundCircleOutlined />}
               />
               <Step
                  status="wait"
                  title="Place Order"
                  icon={<SmileOutlined />}
               />
            </Steps>
         </Col>
         <Col span={24}>
            <h1 className="text-center uppercase">Shipping</h1>
         </Col>
         <Col span={10} offset={6} className="mt-7">
            <Form
               name="basic"
               {...layout}
               form={form}
               // onFinish={handleSubmit}
               // onFinishFailed={onFinishFailed}
               initialValues={{
                  address: "519 White Lane",
                  city: "Wrightsville",
                  postalCode: "31096",
                  country: "Uganda",
               }}
               // onFieldsChange={onChangeHandler}
            >
               <Item
                  label="Address: "
                  name="address"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Item>
               <Item label="City: " name="city" rules={[{ required: true }]}>
                  <Input />
               </Item>

               <Item
                  label="Postal Code: "
                  name="postalCode"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Item>
               <Item
                  label="Country: "
                  name="country"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Item>
               <Item wrapperCol={{ offset: 5, span: 24 }}>
                  <div className="flex justify-between">
                     <Button type="primary" size="middle">
                        <Link href="/login"> Back</Link>
                     </Button>
                     <Button
                        type="primary"
                        size="middle"
                        htmlType="submit"
                        className="-mr-16"
                        onClick={shippingHandler}
                     >
                        Next
                     </Button>
                  </div>
               </Item>
            </Form>
         </Col>
      </Row>
   );
};

export default ShippingScreen;
