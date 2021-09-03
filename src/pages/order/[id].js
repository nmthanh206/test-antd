import { useSelector } from "react-redux";
import { Button, Col, Divider, message, Row, Spin } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "@/components/Message";
import {
   useMutationDeliver,
   useMutationPayment,
   useOrderDetails,
} from "@/hook/order";

import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const OrderScreen = () => {
   const router = useRouter();
   const orderId = router.query.id;
   const user = useSelector((state) => {
      return state.userLogin.user;
   });
   const {
      data: order,
      isLoading,
      isSuccess,
   } = useOrderDetails({ userInfo: user, orderId });
   const { mutate: mutatePay, isLoading: isLoadingPay } = useMutationPayment();
   const { mutate: mutateDeliver, isLoading: isLoadingDeliver } =
      useMutationDeliver();
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };
   if (isSuccess) {
      order.itemsPrice = addDecimals(
         order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
   }
   const successPaymentHandler = (paymentResult) => {
      mutatePay({ userInfo: user, orderId, paymentResult });
   };
   const deliverHandler = () => {
      mutateDeliver({ userInfo: user, order });
   };

   if (isLoading || !order || isLoadingPay || isLoadingDeliver)
      return <Loader />;

   return (
      <Row className="mt-9 color-h1">
         <Col span={24}>
            <h1 className="text-center text-black uppercase">
               Order {orderId}
            </h1>
         </Col>
         <Col span={24}>
            <Row>
               <Col span={18} className="pr-16">
                  <div className="pl-5 text-base text-gray-700">
                     <h2>SHIPPING</h2>
                     <p>
                        <span className="font-semibold">Name: </span>{" "}
                        {order.user.name}
                     </p>
                     <p>
                        <span className="font-semibold">Email: </span>{" "}
                        <a href={`mailto:${order.user.email}`}>
                           {order.user.email}
                        </a>
                     </p>
                     <p>
                        <span className="font-semibold">Address: </span>
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city}{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                     </p>
                     {order.isDelivered ? (
                        <Message type="success">
                           Delivered on {order.deliveredAt}
                        </Message>
                     ) : (
                        <Message type="error">Not Delivered</Message>
                     )}
                     <Divider />

                     <h2>Payment Method</h2>
                     <p>
                        <span className="font-semibold">Method: </span>
                        {order.paymentMethod}
                     </p>
                     {order.isPaid ? (
                        <Message type="success">Paid on {order.paidAt}</Message>
                     ) : (
                        <Message type="error">Not Paid</Message>
                     )}
                     <Divider />
                     <h2>Order Items</h2>
                  </div>
                  {order.orderItems.length === 0 ? (
                     <Message>Your order is empty</Message>
                  ) : (
                     <div>
                        <Row
                           align="bottom"
                           justify="start"
                           className=" font-semibold"
                        >
                           <Col span={4}>
                              <div className="pl-5">Image</div>
                           </Col>
                           <Col span={10}>
                              <div>Name</div>
                           </Col>
                           <Col span={2} pull={1}>
                              <div className="pl-3"> Quantity</div>
                           </Col>
                           <Col span={4}>Price</Col>
                           <Col span={4}>Total</Col>
                        </Row>
                        {order.orderItems.map((item) => {
                           return (
                              <Row key={item.id} align="middle">
                                 <Col span={4}>
                                    <div className="p-5">
                                       <img
                                          src={item.image}
                                          alt={item.name}
                                          width="50%"
                                       />
                                    </div>
                                 </Col>
                                 <Col span={10}>
                                    <div>{item.name}</div>
                                 </Col>
                                 <Col span={2}>{item.qty}</Col>
                                 <Col span={4}>$ {addDecimals(item.price)}</Col>
                                 <Col span={4}>
                                    <strong>
                                       $ {addDecimals(item.qty * item.price)}
                                    </strong>
                                 </Col>
                              </Row>
                           );
                        })}
                     </div>
                  )}
               </Col>
               <Col span={6} pull={1}>
                  <div>
                     <div className="p-4 py-2 mr-7 text-base border-[1px] border-gray-200 border-solid">
                        <Row>
                           <Col span={24}>
                              <h1 className="text-center">Order Summary</h1>
                           </Col>
                        </Row>
                        <Divider className="m-3" />
                        <Row>
                           <Col span={12}>Items</Col>
                           <Col span={12}>$ {order.itemsPrice}</Col>
                        </Row>
                        <Divider className="m-3" />
                        <Row>
                           <Col span={12}>Shipping</Col>
                           <Col span={12}>
                              $ {addDecimals(order.shippingPrice)}
                           </Col>
                        </Row>
                        <Divider className="m-3" />
                        <Row>
                           <Col span={12}>Tax</Col>
                           <Col span={12}>$ {addDecimals(order.taxPrice)}</Col>
                        </Row>
                        <Divider className="m-3" />
                        <Row>
                           <Col span={12}>Total</Col>
                           <Col span={12}>
                              $ {addDecimals(order.totalPrice)}
                           </Col>
                        </Row>
                        {!order.isPaid && <Divider className="m-3" />}
                        <Row>
                           <Col span={24}>
                              {isLoading ? (
                                 <Spin size="small" />
                              ) : (
                                 !order.isPaid && (
                                    <>
                                       <PayPalButton
                                          amount={order.totalPrice}
                                          onSuccess={successPaymentHandler}
                                          currency="USD"
                                          options={{
                                             clientId:
                                                "AS9eaCZ9soWovgKsLaLHVvxp6LNzbjbBJzAnWzuEeBuZZHe3PWEPDDzIQloaO5Hj-l98NtRBLSEmMqYX",
                                          }}
                                       />
                                    </>
                                    // <PayPalButton
                                    //   onSuccess={successPaymentHandler}
                                    //   createOrder={createOrder}
                                    //   options={{
                                    //     clientId:
                                    //       "AS9eaCZ9soWovgKsLaLHVvxp6LNzbjbBJzAnWzuEeBuZZHe3PWEPDDzIQloaO5Hj-l98NtRBLSEmMqYX",
                                    //   }}
                                    // />
                                 )
                              )}

                              {user &&
                                 user.isAdmin &&
                                 order.isPaid &&
                                 !order.isDelivered && (
                                    <Button
                                       type="primary"
                                       block
                                       onClick={deliverHandler}
                                       loading={isLoadingDeliver}
                                       className="mt-2"
                                    >
                                       Mark As Delivered
                                    </Button>
                                 )}
                           </Col>
                        </Row>
                     </div>
                  </div>
                  <div
                     className=" h-6"
                     onClick={() => {
                        message.info("sb-m1jwt6953860@personal.example.com");
                     }}
                  ></div>
               </Col>
            </Row>
         </Col>
      </Row>
   );
};

export default OrderScreen;
