import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';

import * as S from './styles'

function Header() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  
  return (
    <>
      <S.Wrapper>
        <S.navLeft>
          <Link href="/">
          <S.navItens>
            <h2>TODO APP</h2>
          </S.navItens>
          </Link>
          <S.navItens>
            {user?.token !== "null"  ? (<Link href='/projects'>Projects</Link>) : (<Link href='/register'>Register</Link>) }
          </S.navItens>
        </S.navLeft>
        <S.navRight>
          <S.navItens>
            <a href="#"> {user?.name ? `Hello, ${user.name}`: ""} </a>
          </S.navItens>
          
          {user?.token !== "null" ? (
            <S.navItens onClick={() => {
              localStorage.setItem('token', null)
              router.push('/');
              }
            }>Log Out</S.navItens>
          ) : (<> </>) } 
         
        </S.navRight>
      </S.Wrapper>
    </>
  );
}

export default Header;