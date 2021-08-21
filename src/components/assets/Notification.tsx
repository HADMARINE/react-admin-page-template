import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import DismissButtonImage from '@img/icon/DismissButton.png';
import Img from '@components/assets/Img';
import Button from '@components/assets/Button';

interface Props {
  children?: React.ReactNode;
  timeout?: number;
}

const Notification = (props: Props) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, (props.timeout || 3) * 1000);
  });

  const Noti = styled.div`
    @keyframes NotiVanish {
      0%,
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    animation: NotiVanish ${props.timeout || '3'}s ease-out;
    opacity: 0;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    background-color: #f15c5c; // TODO : change color
    margin: auto;
    width: 400px;
    height: 50px;
    z-index: 1000;
    border-radius: 20px;
    color: white;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  `;

  return visible ? (
    <Noti>
      {props.children}
      <div style={{ position: 'absolute', right: '10px', top: 0 }}>
        <Button
          width={'20px'}
          height={'20px'}
          variant={'transparent'}
          onClick={() => setVisible(false)}>
          <Img width={'20px'} alt={'Dismiss'} src={DismissButtonImage} />
        </Button>
      </div>
    </Noti>
  ) : (
    <></>
  );
};

export const PrefixQueryNotification = (
  props: Record<string, unknown>,
): JSX.Element => {
  const query = queryString.parse(window.location.search);
  switch (
    query.redirectType //TODO : check this by json config file
  ) {
    case 'tokenExpired':
      return <Notification>토큰이 만료되었습니다.</Notification>;
    case 'tokenInvalid':
      return <Notification>사용자 인증에 실패했습니다.</Notification>;
    case 'logout':
      return <Notification>로그아웃 되었습니다.</Notification>;
    case 'noSession':
      return <Notification>로그인이 필요합니다.</Notification>;
    case 'registerSuccess':
      return <Notification>회원가입에 성공했습니다.</Notification>;
    case 'emailVerifySuccess':
      return <Notification>이메일 인증에 성공했습니다.</Notification>;
    default:
      if (!query.redirectType) return <></>;
      return (
        <Notification>
          알 수 없는 에러가 발생했습니다. <br />
          Error code : {query.redirectType}
        </Notification>
      );
  }
};

export const PrefixPropsNotification = (props: {
  error?: string;
}): JSX.Element => {
  switch (
    props.error // TODO : check this by json config file
  ) {
    case 'tokenExpired':
      return <Notification>토큰이 만료되었습니다.</Notification>;
    case 'tokenInvalid':
      return <Notification>사용자 인증에 실패했습니다.</Notification>;
    case 'logout':
      return <Notification>로그아웃 되었습니다.</Notification>;
    case 'noSession':
      return <Notification>로그인이 필요합니다.</Notification>;
    case 'registerSuccess':
      return <Notification>회원가입에 성공했습니다.</Notification>;
    case 'emailVerifySuccess':
      return <Notification>이메일 인증에 성공했습니다.</Notification>;
    default:
      if (!props.error) return <></>;
      return (
        <Notification>
          알 수 없는 에러가 발생했습니다. <br />
          Error code : {props.error}
        </Notification>
      );
  }
};

export default {
  default: Notification,
  prefixQuery: PrefixQueryNotification,
  prefixProps: PrefixPropsNotification,
};
