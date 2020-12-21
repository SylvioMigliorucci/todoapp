import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

import { UserContext } from "../../store/UserContext";
import { useRouter } from 'next/router'
import apiInstance from '../../services/api'

export default function AuthForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { user, setUser } = useContext(UserContext);
  const router = useRouter()
  const onSubmit = data => {
    console.log(data)
    apiInstance.post('/login', { email: data.email, password: data.password })
      .then(function (response) {
        console.log('auth', response.data);
        // localStorage.setItem('token', response.data.token)
        setUser(response.data);
        
        router.push('/projects')
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  return (
    <>  
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <input name="email"  type="email" placeholder="Email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        
        <input name="password" type="password" placeholder="password" ref={register({ required: true })} />
        {errors.password && <span>This field is required</span>}
        
        <input type="submit" />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </form>
    </>
  );
}