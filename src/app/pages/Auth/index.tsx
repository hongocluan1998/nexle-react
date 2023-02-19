/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import BG_SIGN_UP from 'asset/backgrounds/bg-sign-up.svg';
import BG_SIGN_IN from 'asset/backgrounds/bg-sign-in.svg';
import FB_ICON from 'asset/icons/facebook-icon.svg';
import GIT_ICON from 'asset/icons/git-icon.svg';
import TW_ICON from 'asset/icons/twitter-icon.svg';
import MAIL_ICON from 'asset/icons/mail-icon.svg';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

interface Props {
  isSignIn?: boolean;
}

export default function Auth(props: Props) {
  const { isSignIn } = props;

  return (
    <Container fluid>
      <Row>
        <Col
          sm="8"
          style={{
            backgroundImage: `url(${isSignIn ? BG_SIGN_IN : BG_SIGN_UP})`,
            height: '100vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Col
          sm="4"
          className="d-flex flex-column justify-content-center bg-light"
          style={{
            padding: '75px 4.861vw 0vw 4.861vw',
          }}
        >
          {isSignIn ? <SignIn /> : <SignUp />}
          <div className="d-flex align-items-center">
            <hr className="w-100" />
            <span style={{ fontSize: '14px' }} className="ms-4 mx-4 text-dark">
              or
            </span>
            <hr className="w-100" />
          </div>
          <div className="mt-3 d-flex align-items-center justify-content-center">
            {[FB_ICON, TW_ICON, MAIL_ICON, GIT_ICON].map(icon => (
              <img role="button" key={icon} src={icon} className="ms-1 mx-1" />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
