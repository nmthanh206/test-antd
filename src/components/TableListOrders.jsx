import { Col, Row, Table, Tag } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import Loader from "./Loader";
import { useListOrders } from "@/hook/order";
const columns = [
   {
      title: "ID",
      dataIndex: "_id",
      // key: "_id",
      sorter: (a, b) => a._id.localeCompare(b._id),
   },
   {
      title: "USER",
      dataIndex: "name",
      // key: "_id",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => {
         if (name === "Unknown") return <Tag color="volcano">{name}</Tag>;
         return name;
      },
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

const TableListOrders = ({ userInfo }) => {
   let { data: listOrders, isLoading } = useListOrders(userInfo);
   //   console.log(listOrders);
   if (isLoading || !listOrders)
      return (
         <div className="-mt-44">
            <Loader />
         </div>
      );

   listOrders = listOrders.map((row) => ({
      ...row,
      key: row._id,
      name: row.user?.name || "Unknown",
   }));
   console.count("chay");
   return (
      <Row>
         <Col
            span={20}
            offset={2}
            className=" border-2 border-gray-100 border-solid shadow-lg"
         >
            <Table
               columns={columns}
               dataSource={listOrders}
               pagination={{
                  defaultCurrent: 1,
                  total: listOrders.length,
                  pageSize: 8,
                  pageSizeOptions: ["8"],
                  showSizeChanger: true,
               }}
            />
         </Col>
      </Row>
   );
};

export default TableListOrders;
