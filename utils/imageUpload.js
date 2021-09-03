import { toast } from "react-toastify";

export const beforeCrop = (file) => {
   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
   if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
   }
   return isJpgOrPng && isLt2M;
};
export const checkValid = (file) => {
   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
   if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
   }
   return isJpgOrPng && isLt2M;
};

export const beforeUpload = (file) => {
   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
   if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
   }
   return isJpgOrPng && isLt2M;
};
export const getBase64 = (img, callback) => {
   //! convert hinh sau khi crop sang base 64 de hien thi trên img tag
   const reader = new FileReader();
   reader.addEventListener("load", () => callback(reader.result));
   reader.readAsDataURL(img);
};
export const onPreview = async (file) => {
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
