import React from "react";
import AuthForm from "../components/AuthForm";
import Header from "../components/Header";

export default function Register() {

  
  return (
    <> 

      <Header></Header> 
      <AuthForm isRegister={true} buttonFormText={"Sign Up"} ></AuthForm>
    </>
  );
}