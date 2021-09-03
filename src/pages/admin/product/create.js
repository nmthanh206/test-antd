import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Button, Form, InputNumber, Upload } from "antd";
import { toast } from "react-toastify";
import ImgCrop from "antd-img-crop";
import { useProductDetails, useMutationCreateProduct } from "@/hook/product";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { checkValid, onPreview } from "@/utils/imageUpload";
const { Item } = Form;
const ProductEditScreen = () => {
   const router = useRouter();
   const [fileList, setFileList] = useState([]);
   const infoAdmin = useSelector((state) => state.userLogin.user);

   const [form] = Form.useForm();
   const productId = router.query.id;

   const { data: productDetail, isLoadingProductDetails } =
      useProductDetails(productId);

   const { mutate: createProduct, isLoadingCreateProduct } =
      useMutationCreateProduct(router);

   useEffect(() => {
      if (!infoAdmin || !infoAdmin.isAdmin) {
         router.push("/login");
      }
   }, [router, infoAdmin]);
   const handleSubmit = async (product) => {
      if (fileList.length === 0) {
         toast.error("Please choose the picture for the product");
         return;
      }
      let formData = null;
      if (fileList[0].originFileObj) {
         formData = new FormData();
         formData.append("file", fileList[0].originFileObj);
      }

      createProduct({ infoAdmin, product, formData });
   };
   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
   };
   const onChange = ({ fileList: newFileList }) => {
      if (newFileList.length === 0) setFileList([]);
      else if (newFileList[newFileList.length - 1].type.startsWith("image"))
         setFileList(newFileList);
   };
   const customRequest = async (options) => {
      options.onSuccess(null, options.file); //? khoi pass gi vo cung dc call de no ket thuc loading hien image
   };
   useEffect(() => {
      form.setFieldsValue({
         name: productDetail ? productDetail.name : "Sample name",
         price: productDetail ? productDetail.price : 0,
         brand: productDetail ? productDetail.brand : "Sample brand",
         category: productDetail ? productDetail.category : "Sample category",
         countInStock: productDetail ? productDetail.countInStock : 0,
         description: productDetail
            ? productDetail.description
            : "Sample description",
      });
   }, [productDetail, form]);
   if (isLoadingProductDetails || isLoadingCreateProduct)
      return (
         <div className="-mt-44">
            <Loader />
         </div>
      );

   return (
      <div>
         <h1 className="text-center">
            {productId ? "EDIT" : "CREATE"} PRODUCT
         </h1>
         <div className="">
            <Form
               name="basic"
               labelCol={{ span: 8 }}
               wrapperCol={{ span: 8 }}
               form={form}
               onFinish={handleSubmit}
               onFinishFailed={onFinishFailed}
               className="uploadImage"
            >
               <Item wrapperCol={{ span: 10, offset: 8 }}>
                  <ImgCrop
                     rotate
                     aspect={1.25}
                     quality={0.4}
                     beforeCrop={checkValid}
                  >
                     <Upload
                        listType="picture-card"
                        accept="image/png, image/jpeg"
                        maxCount={1}
                        onPreview={onPreview}
                        customRequest={customRequest}
                        beforeUpload={checkValid}
                        className="upload-list-inline"
                        fileList={fileList}
                        onChange={onChange}
                     >
                        {fileList.length < 1 && "+ Upload"}
                     </Upload>
                  </ImgCrop>
               </Item>
               <Item label="Name: " name="name" rules={[{ required: true }]}>
                  <Input />
               </Item>
               <Item label="Price: " name="price" rules={[{ required: true }]}>
                  <InputNumber type="number" className="w-full" />
               </Item>

               <Item label="Brand: " name="brand" rules={[{ required: true }]}>
                  <Input />
               </Item>
               <Item
                  label="Count In Stock: "
                  name="countInStock"
                  rules={[{ required: true }]}
               >
                  <InputNumber type="number" className="w-full" />
               </Item>
               <Item
                  label="Category: "
                  name="category"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Item>
               <Item
                  label="Description: "
                  name="description"
                  rules={[{ required: true }]}
                  className="comment"
               >
                  <Input.TextArea
                     placeholder="Write description about product"
                     showCount
                     maxLength={200}
                  />
               </Item>

               <Item wrapperCol={{ offset: 8, span: 16 }}>
                  <div className="flex justify-between items-center">
                     <Button
                        type="primary"
                        size="middle"
                        htmlType="submit"
                        loading={isLoadingCreateProduct}
                     >
                        {productId ? "Update" : "Create"}
                     </Button>
                  </div>
               </Item>
            </Form>
         </div>
      </div>
   );
};

export default ProductEditScreen;
