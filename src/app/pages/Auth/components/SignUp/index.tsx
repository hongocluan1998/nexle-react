import { yupResolver } from '@hookform/resolvers/yup';
import Textfield from 'app/components/Textfield';
import path from 'app/routes/path';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { LocalStorageService } from 'services';
import { signUpAccount } from 'store/slices/auth/authThunk';
import { useAppDispatch } from 'store/store';
import { SignUpData } from 'types/Auth';

import { schemaSignUp, signUpData } from '../../data/Auth.data';

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const signUpForm = useForm<SignUpData>({
    mode: 'onChange',
    defaultValues: signUpData,
    resolver: yupResolver(schemaSignUp),
  });
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = signUpForm;
  const dispatch = useAppDispatch();
  const submitForm = (data: SignUpData) => {
    setIsLoading(true);
    dispatch(signUpAccount(data))
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
        setIsLoading(true);
      })
      .catch(error => {
        setIsLoading(true);
      });
  };
  const redirectSignIn = () => {
    navigate(path.signIn);
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div
        className="text-secondary"
        style={{ fontSize: '18px', fontWeight: 500 }}
      >
        Adventure starts here
      </div>
      <div style={{ fontSize: '14px' }} className="text-dark mt-2">
        Make your app management easy and fun!
      </div>
      <FormGroup>
        <Textfield
          name="firstName"
          control={control}
          placeholder=""
          label="Firstname"
          className="mt-4"
          isRequired
        />
        <Textfield
          name="lastName"
          control={control}
          placeholder=""
          label="Lastname"
          className="mt-2"
          isRequired
        />
        <Textfield
          name="email"
          control={control}
          placeholder=""
          label="Email"
          className="mt-2"
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
        <div className="mt-4">
          <Input type="checkbox" />
          <Label className="ms-3 text-dark" check style={{ fontSize: '14px' }}>
            i agree to
            <span className="text-primary" style={{ fontSize: '14px' }}>
              {' '}
              privacy policy & terms
            </span>
          </Label>
        </div>
        <Button
          disabled={!isValid || isLoading}
          color="primary"
          className="w-100 mt-3"
        >
          <span className="text-light">Sign Up</span>
        </Button>
        <Label
          style={{ fontSize: '14px' }}
          className="mt-3 d-flex justify-content-center text-dark"
        >
          Already have an account?
          <span
            className="text-primary"
            role="button"
            style={{
              fontSize: '14px',
              marginLeft: '10px',
            }}
            onClick={redirectSignIn}
          >
            {' '}
            Sign in instead
          </span>
        </Label>
      </FormGroup>
    </form>
  );
}

export default React.memo(SignUp);
