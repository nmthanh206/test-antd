import React, { useState } from "react";
import { Col, Row, Space, Table } from "antd";
import {
   CheckOutlined,
   CloseOutlined,
   DeleteOutlined,
   EditOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Loader from "./Loader";
import { useListUsers, useMutationDeleteUser } from "@/hook/user";
import Modal from "antd/lib/modal/Modal";

const TableListUsers = ({ userInfo }) => {
   const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
      useMutationDeleteUser();
   let { data: listUsers, isLoading } = useListUsers(userInfo);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [nameDelete, setNameDelete] = useState("");

   const showModal = (name) => {
      setNameDelete(name);
      setIsModalVisible(true);
   };

   const handleOk = (id) => {
      mutateDeleteUser({
         infoAdmin: userInfo,
         userIdDelete: id,
      });
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };
   const columns = [
      {
         title: "ID",
         dataIndex: "_id",
         sorter: (a, b) => a._id.localeCompare(b._id),
      },
      {
         title: "NAME",
         dataIndex: "name",
         sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
         title: "EMAIL",
         dataIndex: "email",
         sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
         title: "ADMIN",
         dataIndex: "isAdmin",

         render: (isAdmin) => {
            return isAdmin ? (
               <CheckOutlined style={{ color: "green", fontSize: "20px" }} />
            ) : (
               <CloseOutlined style={{ color: "red", fontSize: "20px" }} />
            );
         },
      },

      {
         title: "MODIFY",
         // key: "_id",
         dataIndex: "modify",
         render: (_, rowIndex) => {
            return (
               <Space size={30}>
                  <Link href={`/admin/user/${rowIndex._id}/edit`} passHref>
                     <EditOutlined
                        style={{ fontSize: "20px", color: "blue" }}
                     />
                  </Link>
                  <div className="modalColor">
                     <DeleteOutlined
                        style={{ fontSize: "20px", color: "red" }}
                        onClick={() => showModal(rowIndex.name)}
                     />
                     <Modal
                        title="Delete User"
                        visible={isModalVisible}
                        onOk={() => handleOk(rowIndex._id)}
                        onCancel={handleCancel}
                        confirmLoading={isLoading}
                        maskStyle={{ background: "rgba(0, 0, 0, 0.2)" }}
                     >
                        <p>
                           Are you sure you want to delete the user{" "}
                           <strong>{nameDelete}</strong>?
                        </p>
                     </Modal>
                  </div>
               </Space>
            );
         },
      },
   ];

   if (isLoading || !listUsers || isLoadingDeleteUser)
      return (
         <div className="-mt-44">
            <Loader />
         </div>
      );
   listUsers = listUsers.map((row) => ({
      ...row,
      key: row._id,
   }));
   // console.count("chay");
   return (
      <Row>
         <Col
            span={20}
            offset={2}
            className=" border-2 border-gray-100 border-solid shadow-lg"
         >
            <Table
               columns={columns}
               dataSource={listUsers}
               pagination={{
                  defaultCurrent: 1,
                  total: listUsers.length,
                  // total: 30,
                  pageSize: 8,
                  pageSizeOptions: ["8"],
                  showSizeChanger: true,
               }}
            />
         </Col>
      </Row>
   );
};

export default TableListUsers;
