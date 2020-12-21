import {createContext } from 'react'

const userToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null

export const UserContext = createContext({token: userToken});