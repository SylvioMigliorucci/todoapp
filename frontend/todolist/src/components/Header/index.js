import Link from 'next/link';
import React, { useContext } from 'react';
import { UserContext } from '../../store/UserContext';

import * as S from './styles'

function Header({name}) {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <S.Wrapper>
        <S.navLeft>
          <S.navItens>
            <h2>TODO APP</h2>
          </S.navItens>
          <S.navItens>
            <Link href='/projects'>Projects</Link>
          </S.navItens>
        </S.navLeft>
        <S.navRight>
        <S.navItens>
          <a href="#"> Hello, {user.name}</a>
        </S.navItens>
        <S.navItens>
          <button onClick={() => {
            setUser([]);
            localStorage.setItem('token', null)
            }
          }>Log Out</button>
        </S.navItens>
        </S.navRight>
      </S.Wrapper>
    </>
  );
}

export default Header;