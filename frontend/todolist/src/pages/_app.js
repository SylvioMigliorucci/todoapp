import '../styles/globals.css'
import { Provider, Context } from '../store'
import { UserContext } from '../store/UserContext'
import { useMemo, useState } from 'react'
import { CookiesProvider } from "react-cookie"
import { parseCookies } from "../store"
function MyApp({ Component, pageProps }) {
 
 const userToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null

 const [user, setUser] = useState({token: userToken});

 const userValue = useMemo(() => ({ user, setUser}), [user, setUser]);

  return (
    <> 
    <CookiesProvider>
      <UserContext.Provider value={userValue}>
          <Component {...pageProps} />
      </UserContext.Provider>
    </CookiesProvider>
    </>
  )
}

export default MyApp
