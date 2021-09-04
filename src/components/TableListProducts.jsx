import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Space, Table, Tag } from "antd";
import React, { useState } from "react";

import { useMutationDeleteProduct, useListProducts } from "@/hook/product";
import Loader from "./Loader";
import Link from "next/link";
import { stringToColour } from "@/utils/generateColor";
import Modal from "antd/lib/modal/Modal";
import { useRouter } from "next/router";
import { useNextQueryParams } from "@/hook/useNextQueryParams";
const TableListProducts = ({ userInfo }) => {
   // const router = useRouter();
   const router = useNextQueryParams();
   const { pageNumber = 1, keyword = "" } = router.query;
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [nameDelete, setNameDelete] = useState("");
   const [page, setPage] = useState(pageNumber);
   let { data: listProducts, isLoading } = useListProducts({
      pageNumber: page,
      keyword,
   });
   const { mutate: deleteProduct, isLoadingDeleteProduct } =
      useMutationDeleteProduct();
   const showModal = (name) => {
      setNameDelete(name);
      setIsModalVisible(true);
   };

   const handleOk = (id, image) => {
      deleteProduct({
         infoAdmin: userInfo,
         productId: id,
         image,
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
         title: "PRICE",
         dataIndex: "price",
         sorter: (a, b) => a.price - b.price,
      },
      {
         title: "CATEGORY",
         dataIndex: "category",
         sorter: (a, b) => a.name.localeCompare(b.name),
         render: (category, rowIndex) => {
            return <Tag color={stringToColour(category)}>{category}</Tag>;
         },
      },
      {
         title: "BRAND",
         dataIndex: "brand",

         render: (brand, rowIndex) => {
            return <Tag color={stringToColour(brand)}>{brand}</Tag>;
         },
      },

      {
         title: "MODIFY",
         // key: "_id",
         dataIndex: "modify",
         render: (_, rowIndex) => {
            return (
               <Space size={30}>
                  <Link href={`/admin/product/${rowIndex._id}/edit`} passHref>
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
                        onOk={() =>
                           handleOk(rowIndex._id, rowIndex.image.split(".")[0])
                        }
                        onCancel={handleCancel}
                        confirmLoading={isLoading}
                        maskStyle={{ background: "rgba(0, 0, 0, 0.2)" }}
                     >
                        <p>
                           Are you sure you want to delete the product{" "}
                           <strong>{nameDelete}</strong>?
                        </p>
                     </Modal>
                  </div>
               </Space>
            );
         },
      },
   ];

   //   console.log(listProducts);
   if (isLoading || !listProducts || isLoadingDeleteProduct) return <Loader />;
   const { total, pageSize } = listProducts;
   listProducts = listProducts.products; //? vi no tra ve co page nua
   listProducts = listProducts.map((row) => ({
      ...row,
      key: row._id,
   }));

   return (
      <Row>
         <Col span={4} offset={20} className="">
            <Link href="/admin/product/create" passHref>
               <div className="inline-block py-2 px-5 -mr-10 text-white hover:text-white bg-[#1890ff] rounded-3xl cursor-pointer">
                  <PlusOutlined /> Create Product
               </div>
            </Link>
         </Col>
         <Col
            span={20}
            offset={2}
            className=" pr-2 mt-6 border-2 border-gray-100 border-solid shadow-lg"
         >
            <Table
               columns={columns}
               dataSource={listProducts}
               pagination={{
                  defaultCurrent: 1,
                  current: page,
                  total,
                  pageSize,
                  onChange: (newPage, pageSize) => setPage(newPage),
                  pageSizeOptions: ["8"],
                  showSizeChanger: true,
               }}
            />
         </Col>
      </Row>
   );
};

export default TableListProducts;
