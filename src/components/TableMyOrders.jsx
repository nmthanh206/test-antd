import { Table, Tag } from "antd";
import React from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useMyOrders } from "@/hook/order";
import Loader from "./Loader";
const columns = [
   {
      title: "ID",
      dataIndex: "_id",
      // key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
   },
   {
      title: "DATE",
      dataIndex: "createdAt",
      // key: "createdAt",
      render: (createdAt) => {
         return <Tag color="geekblue">{createdAt.substring(0, 10)}</Tag>;
      },
      sorter: (a, b) => {
         const x = new Date(a.createdAt);
         const y = new Date(b.createdAt);
         return x.getTime() - y.getTime();
      },
   },
   {
      title: "TOTAL",
      dataIndex: "totalPrice",
      // key: "totalPrice",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      // sortDirections: ["descend", "ascend"],  k oco cung dc
   },
   {
      title: "PAID",
      // key: "isPaid",
      dataIndex: "isPaid",
      render: (isPaid, rowIndex) => {
         return isPaid ? (
            <Tag color="green">{rowIndex.paidAt.substring(0, 10)}</Tag>
         ) : (
            <Tag color="volcano">
               <CloseOutlined /> Not Paid
            </Tag>
         );
      },
      sorter: (a, b) => {
         const x = new Date(a.isPaid);
         const y = new Date(b.isPaid);
         return x.getTime() - y.getTime();
      },
   },
   {
      title: "DELIVERED",
      // key: "isDelivered",
      dataIndex: "isDelivered",
      render: (isDelivered, rowIndex) => {
         return isDelivered ? (
            <Tag color="green">{rowIndex.deliveredAt.substring(0, 10)}</Tag>
         ) : (
            <Tag color="volcano">
               <CloseOutlined /> Not Delivered
            </Tag>
         );
      },
      sorter: (a, b) => {
         const x = new Date(a.isDelivered);
         const y = new Date(b.isDelivered);
         return x.getTime() - y.getTime();
      },
   },
   {
      title: "Detail",
      // key: "_id",
      dataIndex: "detail",
      render: (_, rowIndex) => (
         <Link href={`/order/${rowIndex._id}`} passHref>
            <SearchOutlined style={{ fontSize: "20px" }} />
         </Link>
      ),
   },
];

const TableMyOrders = ({ userInfo }) => {
   let { data: myOrders, isLoading } = useMyOrders(userInfo);
   //   console.log(myOrders);
   if (isLoading || !myOrders) return <Loader />;

   myOrders = myOrders.map((row) => ({
      ...row,
      key: row._id,
   }));

   return (
      <div className="">
         <Table
            columns={columns}
            dataSource={myOrders}
            pagination={{
               defaultCurrent: 1,
               total: myOrders.length,
               defaultPageSize: 10,
               pageSizeOptions: ["5", "10"],
               showSizeChanger: true,
            }}
         />
      </div>
   );
};

export default TableMyOrders;
