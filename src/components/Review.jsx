import { Col, Rate, Row, List, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";

const Review = ({ reviews, form, setTextSubmit, setRate }) => {
   const userId = useSelector((state) => state.userLogin.user?._id);
   // console.log(userId);
   // console.log(reviews);
   return (
      <List
         className="reviewProduct"
         itemLayout="horizontal"
         dataSource={reviews}
         renderItem={(review) => {
            const name = review.name.toUpperCase().split(" ");
            const length = name.length;
            const createAt = review.createdAt.substring(0, 10).split("-");
            const day = createAt[2];
            const month = createAt[1];
            const year = createAt[0];
            return (
               <>
                  <List.Item>
                     <List.Item.Meta
                        className="py-4 px-2 rounded-lg border-2 border-blue-100 border-solid"
                        avatar={
                           <>
                              <div className=" flex justify-center items-center w-10 h-10 bg-gray-200 rounded-3xl">
                                 <span className="font-bold text-gray-500">
                                    {length > 1
                                       ? `${name[length - 2][0]}${
                                            name[length - 1][0]
                                         }`
                                       : name[0][0]}
                                 </span>
                              </div>
                              <div className="mt-1 text-xs font-semibold text-gray-400">
                                 {`${day}-${month}-${year}`}
                              </div>
                           </>
                        }
                        title={
                           <>
                              {/* <Row className="cmt">
                      <Col span={10}>{review.name}</Col>
                      <Col span={5} pull={13} className="-mt-1">
                        <Rate
                          allowHalf
                          disabled
                          defaultValue={review.rating}
                          className="start"
                        />
                      </Col>
                    </Row> */}
                              <Row className="" align="middle">
                                 <Col span={10}>
                                    <h3>{review.name}</h3>
                                 </Col>
                                 <Col span={10} className="-mt-1">
                                    <Rate
                                       allowHalf
                                       disabled
                                       value={review.rating}
                                       className="start"
                                       style={{ fontSize: "15px" }}
                                    />
                                 </Col>
                                 {review.user === userId && (
                                    <Col span={1} offset={3} className=" -mt-2">
                                       <Button
                                          type="ghost"
                                          shape="circle"
                                          icon={<EditTwoTone />}
                                          size={5}
                                          onClick={() => {
                                             setTextSubmit("Update");
                                             setRate(review.rating);
                                             form.setFieldsValue({
                                                comment: review.comment,
                                             });
                                          }}
                                       />
                                    </Col>
                                 )}
                              </Row>
                           </>
                        }
                        description={review.comment}
                     />
                  </List.Item>
               </>
            );
         }}
      />
   );
};

export default Review;
