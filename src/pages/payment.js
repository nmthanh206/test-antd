import {
   LoadingOutlined,
   ShopOutlined,
   SmileOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Steps, Radio, Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { savePaymentMethod } from "@/reducers/cartReducer";
import { useRouter } from "next/router";

const { Step } = Steps;

const ShippingScreen = () => {
   const router = useRouter();
   const [payment, setPayment] = useState("PayPal");
   const dispatch = useDispatch();
   const onChange = (e) => {
      setPayment(e.target.value);
   };
   const paymentHandler = () => {
      dispatch(savePaymentMethod(payment));
      router.push("/placeorder");
   };
   return (
      <Row className="mt-9">
         <Col span={24}>
            <Steps className="px-16">
               <Step status="finish" title="Login" icon={<UserOutlined />} />
               <Step status="finish" title="Shipping" icon={<ShopOutlined />} />
               <Step
                  status="process"
                  title="Payment"
                  icon={<LoadingOutlined />}
               />
               <Step
                  status="wait"
                  title="Place Order"
                  icon={<SmileOutlined />}
               />
            </Steps>
         </Col>
         <Col span={24}>
            <h1 className="text-center uppercase">Payment Method</h1>
         </Col>
         <Col span={10} offset={6} className="mt-7 verticalInput">
            <div className="pl-20 text-xl text-center text-gray-500">
               Select Method
            </div>
            <div className=" box-border p-5 ml-3">
               <Radio.Group onChange={onChange} value={payment}>
                  <Radio value="PayPal">PayPal or Credit Card</Radio>
                  <Radio value="Stripe">Stripe</Radio>
               </Radio.Group>
            </div>
            <div
               className=" flex justify-between"
               style={{ marginTop: "97px" }}
            >
               <Button
                  type="primary"
                  size="middle"
                  style={{ marginLeft: "106px" }}
               >
                  <Link href="/shipping"> Back</Link>
               </Button>
               <Button
                  type="primary"
                  size="middle"
                  htmlType="submit"
                  className="-mr-16"
                  onClick={paymentHandler}
               >
                  Next
               </Button>
            </div>
         </Col>
      </Row>
   );
};

export default ShippingScreen;
