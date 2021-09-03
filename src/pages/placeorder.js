import {
   LoadingOutlined,
   PoundCircleOutlined,
   ShopOutlined,
   UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Row, Steps } from "antd";
import { useSelector } from "react-redux";
import Message from "@/components/Message";

import { useMutationCreateOrder } from "@/hook/order";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/link";
const { Step } = Steps;

const PlaceOrderScreen = () => {
   const router = useRouter();
   const cart = useSelector((state) => {
      return { ...state.cart };
   });
   const user = useSelector((state) => {
      return state.userLogin.user;
   });

   useEffect(() => {
      if (!user) {
         router.push("/login");
      } else if (!cart.paymentMethod) {
         router.push("/payment");
      } else if (!cart.shippingAddress.address) {
         router.push("/shipping");
      }
   }, [cart.paymentMethod, cart.shippingAddress.address, router, user]);
   const { mutate: createOrder, isLoading } = useMutationCreateOrder(router);

   //   Calculate prices
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
   };

   cart.itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   );
   cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
   cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
   cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
   ).toFixed(2);
   const placeOrderHandler = () => {
      const userInfo = user;
      const order = {
         orderItems: cart.cartItems,
         shippingAddress: cart.shippingAddress,
         paymentMethod: cart.paymentMethod,
         itemsPrice: cart.itemsPrice,
         shippingPrice: cart.shippingPrice,
         taxPrice: cart.taxPrice,
         totalPrice: cart.totalPrice,
      };
      // console.log(userInfo, order);
      createOrder({ userInfo, order });
   };
   return (
      <Row className="mt-9 color-h1">
         <Col span={24}>
            <Steps className="px-16">
               <Step status="finish" title="Login" icon={<UserOutlined />} />
               <Step status="finish" title="Shipping" icon={<ShopOutlined />} />
               <Step
                  status="finish"
                  title="Payment"
                  icon={<PoundCircleOutlined />}
               />
               <Step
                  status="process"
                  title="Place Order"
                  icon={<LoadingOutlined />}
               />
            </Steps>
         </Col>
         <Col span={24}>
            <h1 className="text-center text-black uppercase">Place Order</h1>
         </Col>
         <Col span={24}>
            <Row>
               <Col span={18} className="pr-16">
                  <div className="pl-5 text-base text-gray-700">
                     <h2>SHIPPING</h2>
                     <p>
                        <span className="font-semibold">Address: </span>
                        {cart.shippingAddress.address},{" "}
                        {cart.shippingAddress.city}{" "}
                        {cart.shippingAddress.postalCode},{" "}
                        {cart.shippingAddress.country}
                     </p>

                     <Divider className="m-0" />

                     <h2>Payment Method</h2>
                     <p>
                        <span className="font-semibold">Method: </span>
                        {cart.paymentMethod}
                     </p>

                     <Divider />
                     <h2>Order Items</h2>
                  </div>
                  {cart.cartItems.length === 0 ? (
                     <Message>Your cart is empty</Message>
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
                        {cart.cartItems.map((item) => {
                           return (
                              <Row key={item.id} align="middle">
                                 <Col span={4}>
                                    <div className="p-5">
                                       <img
                                          src={item.image}
                                          alt={item.name}
                                          width="50%"
                                       />

                                       {/* <Image
                                          alt={item.name}
                                          src={
                                             item.image.startsWith("/images")
                                                ? item.image
                                                : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1630656715/${item.image}`
                                          }
                                          width={51}
                                          height={40}
                                       /> */}
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
                           <Col span={12}>$ {addDecimals(cart.itemsPrice)}</Col>
                        </Row>
                        <Divider className="m-3" />

                        <Row>
                           <Col span={12}>Shipping</Col>
                           <Col span={12}>
                              $ {addDecimals(cart.shippingPrice)}
                           </Col>
                        </Row>
                        <Divider className="m-3" />

                        <Row>
                           <Col span={12}>Tax</Col>
                           <Col span={12}>${addDecimals(cart.taxPrice)}</Col>
                        </Row>
                        <Divider className="m-3" />

                        <Row>
                           <Col span={12}>Total</Col>
                           <Col span={12}>${addDecimals(cart.totalPrice)}</Col>
                        </Row>
                        {user && !user.isAdmin && (
                           <>
                              <Divider className="m-2" />

                              <Row>
                                 <Col span={24}>
                                    <Button
                                       type="primary"
                                       block
                                       onClick={placeOrderHandler}
                                       loading={isLoading}
                                    >
                                       Place Order
                                    </Button>
                                 </Col>
                              </Row>
                           </>
                        )}
                     </div>
                  </div>
               </Col>
            </Row>
         </Col>
      </Row>
   );
};

export default PlaceOrderScreen;
