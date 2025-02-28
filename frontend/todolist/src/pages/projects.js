import Head from 'next/head'
import { useContext } from 'react'
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import ProjectsList from '../components/ProjectsList';

import { UserContext } from '../store/UserContext'
import styles from '../styles/Home.module.css'

export default function Home() {
  const {user, setUser} = useContext(UserContext);
  return (
    <>
      <Header />
      <ProjectsList></ProjectsList>
      
    </>
  )
}
