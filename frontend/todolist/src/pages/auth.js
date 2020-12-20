import Head from 'next/head'
import AuthForm from '../components/AuthForm'
import styles from '../styles/Home.module.css'
import {Context} from '../store'
import Link from 'next/link'

export default function auth() {
  return (
    <>
      <h1>Login</h1>
      <AuthForm></AuthForm>
      {/* <h2>{Context}</h2> */}
      <Link href="/">Index</Link>
    </>
  )
  
}