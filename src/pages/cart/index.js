import { useSelector } from "react-redux";
import { Row, Col, Button, PageHeader } from "antd";
import ProductCart from "@/components/ProductCart";
import Link from "next/link";
import { useRouter } from "next/router";
const CartScreen = () => {
   const router = useRouter();
   const cartItems = useSelector((state) => state.cart.cartItems);
   const user = useSelector((state) => state.userLogin.user);
   if (cartItems.length === 0)
      return (
         <center className="mt-36 text-2xl text-gray-400">
            <div>
               Your cart is empty <Link href="/">Go Back</Link>
            </div>
         </center>
      );
   const numItem = cartItems.reduce((acc, item) => acc + item.qty, 0);
   const total = cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);

   const checkoutHandler = () => {
      if (!user) {
         router.push("/login?redirect=shipping");
      } else {
         router.push("/shipping");
      }
   };
   return (
      <PageHeader
         className="site-page-header"
         onBack={() => router.push("/")}
         title="Back Home"
         // subTitle=""
      >
         <Row>
            <Col span={18}>
               {" "}
               <h1 className="text-center uppercase">Shopping Cart</h1>
            </Col>
            <Col span={18}>
               {cartItems.map((item) => {
                  return <ProductCart key={item.id} item={item} />;
               })}
            </Col>
            {/* <Col span={6} pull={1}> */}
            <Col span={6} pull={1}>
               <div className=" py-5 border-2 border-gray-200 border-solid">
                  <div className="px-4 text-center">
                     <h1 className="text-xl">Subtotal ({numItem}) items</h1>
                     <h2 className=" border-0 border-b-2 border-gray-200 border-solid">
                        $ {total}
                     </h2>

                     <Button
                        type="primary"
                        block
                        className="h-10 uppercase"
                        onClick={checkoutHandler}
                     >
                        {" "}
                        Proceed To Checkout
                     </Button>
                  </div>
               </div>
            </Col>
         </Row>
      </PageHeader>
   );
};

export default CartScreen;
