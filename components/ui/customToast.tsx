// CustomToast.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showErrorToast = (message : string) => {
  toast.error(message);
};

export const showSuccessToast = (message : string) => {
  toast.success(message);
};

const CustomToast = () => {

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export default CustomToast;

//How to use
//1. import what you need import CustomToast, { showErrorToast } from "../ui/customToast"; 
//2. Call the function showErrorToast("Your message here") anywhere in your code to show the toast.
//3. and instead of using the default <Toast>, use the <CustomToast/> component in the component you want to show the toast.
