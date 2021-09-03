import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Button, Form, InputNumber, Upload } from "antd";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

import {
   useMutationCreateProduct,
   useProductDetails,
   useMutationUpdateProduct,
} from "@/hook/product";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
const { Item } = Form;

const layout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 8 },
};
const layoutImage = {
   // labelCol: { span: 24 },
   wrapperCol: { span: 10, offset: 8 },
};

const tailLayout = {
   wrapperCol: { offset: 8, span: 16 },
};

const ProductEditScreen = () => {
   const router = useRouter();
   const infoAdmin = useSelector((state) => state.userLogin.user);
   const [file, setFile] = useState(null); //cai nay de dispaly len man hinh cai nay de send len server
   const [form] = Form.useForm();
   const productId = router.query.id;
   // console.log(productId);
   const { data: productDetail, isLoadingProductDetails } =
      useProductDetails(productId);
   const [fileList, setFileList] = useState([
      //cai nay de dispaly len man hinh
      {
         uid: "1",
         name: "sample.jpg",
         status: "done",
         url: "/images/sample.jpg",
         thumbUrl: "/images/sample.jpg",
      },
   ]);

   const { mutate: createProduct, isLoadingCreateProduct } =
      useMutationCreateProduct(router);
   const { mutate: updateProduct, isLoadingUpdateProduct } =
      useMutationUpdateProduct(router);

   useEffect(() => {
      if (!infoAdmin || !infoAdmin.isAdmin) {
         router.push("/login");
      }
   }, [router, infoAdmin]);
   const handleSubmit = async ({
      name,
      price,
      brand,
      category,
      countInStock,
      description,
   }) => {
      let formData = null;
      if (file) {
         formData = new FormData();
         formData.append("image", file);
      }
      const product = {
         name,
         price,
         brand,
         category,
         countInStock,
         description,
         user: infoAdmin._id,
      };
      productId
         ? updateProduct({
              infoAdmin,
              product: {
                 ...product,
                 _id: productDetail._id,
                 image: productDetail.image,
              },
              formData,
           })
         : createProduct({ infoAdmin, product, formData });
   };

   const onFinishFailed = (errorInfo) => {
      toast.error(errorInfo.message);
      console.log("Failed:", errorInfo);
   };

   const beforeUpload = (file) => {
      const isJpgOrPng =
         file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
         toast.error("You can only upload JPG/PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
         toast.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
   };
   const getBase64 = (img, callback) => {
      //! convert hinh sau khi crop sang base 64 de hien thi trên img tag
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
   };
   const customRequest = async (options) => {
      setFile(options.file);
      getBase64(options.file, (url) =>
         setFileList([
            {
               // uid: "1",
               uid: options.file.uid,
               name: options.file.name,
               status: "done",
               url,
               thumbUrl: url,
            },
         ])
      );
      options.onSuccess(null, options.file); //? khoi pass gi vo cung dc call de no ket thuc loading hien image
   };
   const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
         src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
         });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
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
      setFileList([
         {
            // uid: "1",
            uid: productDetail ? productDetail.image : "1",
            name: productDetail ? productDetail.name : "sample.jpg",
            status: "done",
            url: productDetail ? productDetail.image : "/images/sample.jpg",
            thumbUrl: productDetail
               ? productDetail.image
               : "/images/sample.jpg",
         },
      ]);
   }, [productDetail, form]);
   if (
      isLoadingCreateProduct ||
      isLoadingProductDetails ||
      isLoadingUpdateProduct
   )
      return (
         <div className="-mt-44">
            <Loader />
         </div>
      );

   if (!infoAdmin || !infoAdmin.isAdmin) return null;
   return (
      <div>
         <h1 className="text-center">
            {productId ? "EDIT" : "CREATE"} PRODUCT
         </h1>
         <div className="">
            <Form
               name="basic"
               {...layout}
               form={form}
               onFinish={handleSubmit}
               onFinishFailed={onFinishFailed}
               className="uploadImage"
            >
               <Item {...layoutImage}>
                  <ImgCrop rotate aspect={1.25} quality={0.4}>
                     <Upload
                        // defaultFileList={defaultFileList}
                        fileList={fileList}
                        listType="picture"
                        // listType="picture-card"
                        // accept="image/*"
                        // showUploadList={true}
                        showUploadList={{ showRemoveIcon: false }}
                        accept="image/png, image/jpeg"
                        maxCount={1}
                        customRequest={customRequest}
                        onPreview={onPreview}
                        beforeUpload={beforeUpload}
                        className="upload-list-inline"
                        showRemoveIcon={false}
                     >
                        <Button icon={<UploadOutlined />}>Upload</Button>
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

               <Item {...tailLayout}>
                  <div className="flex justify-between items-center">
                     <Button
                        type="primary"
                        size="middle"
                        htmlType="submit"
                        loading={
                           isLoadingCreateProduct || isLoadingUpdateProduct
                        }
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
