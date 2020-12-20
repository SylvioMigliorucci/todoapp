import Head from 'next/head'
import { useContext } from 'react'
import AuthForm from '../components/AuthForm';
import { UserContext } from '../store/UserContext'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  const {user, setUser} = useContext(UserContext);
  return (
    <>
      <AuthForm></AuthForm>
      <Link href='/projects'>Projecst</Link>
    </>
  )
}
