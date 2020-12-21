import '../styles/globals.css'
import { Provider, Context } from '../store'
import { UserContext } from '../store/UserContext'
import { useMemo, useState } from 'react'

function MyApp({ Component, pageProps }) {
 
 const userToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null

 const [user, setUser] = useState({token: userToken});

 const userValue = useMemo(() => ({ user, setUser}), [user, setUser]);

  return (
    <> 
      <UserContext.Provider value={userValue}>
          <Component {...pageProps} />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
