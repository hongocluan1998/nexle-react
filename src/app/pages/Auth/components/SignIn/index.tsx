import { yupResolver } from '@hookform/resolvers/yup';
import Textfield from 'app/components/Textfield';
import path from 'app/routes/path';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { LocalStorageService } from 'services';
import { signInNormal } from 'store/slices/auth/authThunk';
import { useAppDispatch } from 'store/store';
import { SignInData } from 'types/Auth';

import { schemaSignIn, signInData } from '../../data/Auth.data';

function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signInForm = useForm<SignInData>({
    mode: 'onChange',
    defaultValues: signInData,
    resolver: yupResolver(schemaSignIn),
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = signInForm;
  const submitForm = (data: SignInData) => {
    setIsLoading(true);
    dispatch(signInNormal(data))
      .unwrap()
      .then(response => {
        LocalStorageService.set(
          LocalStorageService.OAUTH_TOKEN,
          response?.token,
        );
        LocalStorageService.set(
          LocalStorageService.REFRESH_TOKEN,
          response?.refreshToken,
        );
        LocalStorageService.set(LocalStorageService.PROFILE_SERVICE, response);
        navigate(path.dashboard);
        setIsLoading(false);
      })
      .catch(error => {
        if (error?.errors?.message?.[0]?.includes('Email')) {
          setError('email', {
            type: 'error',
            message: error?.errors?.message?.[0] || 'Email is error',
          });
        } else {
          setError('password', {
            type: 'error',
            message: error?.errors?.message?.[0] || 'Password is error',
          });
        }
        setIsLoading(false);
      });
  };
  const redirectSignUp = () => {
    navigate(path.signUp);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div
        className="text-secondary"
        style={{ fontSize: '18px', fontWeight: 500 }}
      >
        Welcome to ReactJS Test Interview! 👋🏻
      </div>
      <div className="text-dark mt-2" style={{ fontSize: '14px' }}>
        Please sign-in to your account and start the adventure
      </div>
      <FormGroup>
        <Textfield
          name="email"
          control={control}
          placeholder=""
          label="Email"
          className="mt-4"
          isRequired
        />
        <Textfield
          name="password"
          control={control}
          placeholder=""
          label="Password"
          className="mt-2"
          isRequired
          type="password"
        />
        <div className="mt-2">
          <Input type="checkbox" />
          <Label className="ms-3 text-dark" check style={{ fontSize: '14px' }}>
            Remember me
          </Label>
        </div>
        <Button
          disabled={!isValid || isLoading}
          color="primary"
          className="w-100 mt-3"
        >
          <span className="text-light">Login</span>
        </Button>
        <Label
          style={{ fontSize: '14px' }}
          className="mt-3 d-flex justify-content-center text-dark"
        >
          New on our platform?
          <span
            className="text-primary"
            role="button"
            style={{
              fontSize: '14px',
              marginLeft: '10px',
            }}
            onClick={redirectSignUp}
          >
            {' '}
            Create an account
          </span>
        </Label>
      </FormGroup>
    </form>
  );
}

export default React.memo(SignIn);
