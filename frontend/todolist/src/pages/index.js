import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import AuthForm from '../components/AuthForm';
import { UserContext } from '../store/UserContext'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function Home() {
  const {user, setUser} = useContext(UserContext);
  const router = useRouter();
  const [isUserLogged, setIsUserLogger] = useState(false);
  useEffect(() => {
    console.log('email', user)
    user?.token ? setIsUserLogger(false) : router.push('/projects') 

  }, [])
  return (
    <>
      <Header />
      {isUserLogged || (<> <AuthForm isRegister={false} buttonFormText={"Sign In"}></AuthForm> </>)}
      
      
    </>
  )
}
