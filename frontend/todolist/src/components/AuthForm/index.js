import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

import { UserContext } from "../../store/UserContext";
import { useRouter } from 'next/router'
import apiInstance from '../../services/api'
import * as S from './styles'

export default function AuthForm({isRegister = false, buttonFormText="Sign In"}) {
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
  
  const onRegister = data => {
    console.log(data)
    apiInstance.post('/signin', { email: data.email, password: data.password, name:data.name })
      .then(function (response) {
        router.push('/')
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>  
      <S.Container>
        <form onSubmit={handleSubmit(!isRegister ? onSubmit : onRegister)}>

          {!isRegister || (
          <>
            <S.InputForm name="name"  type="text" placeholder="Name" ref={register({ required: true })} />
            {errors.email && <span>This field is required</span>}
          </>
          )}

          <S.InputForm name="email"  type="email" placeholder="Email" ref={register({ required: true })} />
          {errors.email && <span>This field is required</span>}
          
          <S.InputForm name="password" type="password" placeholder="Password" ref={register({ required: true })} />
          {errors.password && <span>This field is required</span>}
          
          <S.InputForm type="submit" value={buttonFormText}/>
          
        </form>
      </S.Container>
    </>
  );
}