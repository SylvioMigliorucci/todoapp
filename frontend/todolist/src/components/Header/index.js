import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';

import * as S from './styles'

function Header() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  console.log('header token',user)
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
            {user.token !== "null"  ? (<Link href='/projects'>Projects</Link>) : (<Link href='/register'>Register</Link>) }
          </S.navItens>
        </S.navLeft>
        <S.navRight>
          <S.navItens>
            <a href="#"> {user.name ? `Hello, ${user.name}`: ""} </a>
          </S.navItens>
          <S.navItens>
          {user.token !== "null" ? (
            <button onClick={() => {
                router.push('/');
                localStorage.setItem('token', null)
              }
            }>Log Out</button>
          ) : (<> </>) } 
          </S.navItens>
        </S.navRight>
      </S.Wrapper>
    </>
  );
}

export default Header;