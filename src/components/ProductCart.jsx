/* eslint-disable @next/next/no-img-element */
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, Row, Form, Select } from "antd";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQtyItem } from "@/reducers/cartReducer";
import Image from "next/image";
const ProductCart = ({ item }) => {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const nameQty = `qty${item.id}`; //dat ten unique de khong bi trung lucx render list Form.Item
   return (
      <div>
         <Row align="middle" justify="start" gutter={[16, 0]}>
            <Col span={5}>
               <div className=" !p-7">
                  {/* <img
                     src={item.image}
                     alt={item.name}
                     className="p-7 w-full"
                  /> */}
                  <Image
                     alt={item.name}
                     src={
                        item.image.startsWith("/images")
                           ? item.image
                           : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1630656715/${item.image}`
                     }
                     width={115}
                     height={91}
                  />
               </div>
            </Col>
            <Col span={7}>
               <Link href={`/product/${item.id}`}>{item.name}</Link>
            </Col>
            <Col span={3}>
               <h3>$ {item.price}</h3>
            </Col>
            <Col span={5}>
               <Form form={form} initialValues={{ [nameQty]: item.qty }}>
                  {/* //de ko bi trung qty o truoc */}
                  <Form.Item name={nameQty} className="mb-0">
                     <Select
                        style={{ width: 120 }}
                        className="-mt-4"
                        disabled={item.countInStock < 1}
                        onChange={(qty) =>
                           dispatch(
                              updateQtyItem({
                                 id: item.id,
                                 // qty: form.getFieldValue()[nameQty],  //cach nao cung dc
                                 qty,
                              })
                           )
                        }
                     >
                        {[...Array(item.countInStock).keys()].map((x) => (
                           <Select.Option key={x + 1} value={x + 1}>
                              {x + 1}
                           </Select.Option>
                        ))}
                     </Select>
                  </Form.Item>
               </Form>
            </Col>
            <Col span={4}>
               <DeleteOutlined
                  style={{ color: "#f5222d", fontSize: "17px" }}
                  onClick={() => dispatch(removeFromCart(item.id))}
               />
            </Col>
            <Col span={22}>
               <Divider className=" my-0" />
            </Col>
         </Row>
      </div>
   );
};

export default ProductCart;
