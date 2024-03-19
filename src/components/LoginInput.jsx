import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/button';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <>
      <div className="mb-4 w-full">
        <label htmlFor="email" className=" text-gray-700">
          Email
          <input type="email" value={email} onChange={onEmailChange} name="email" id="email" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" />
        </label>
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="password" className="block text-gray-700">
          Password
          <input type="password" value={password} onChange={onPasswordChange} name="password" id="password" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" />
        </label>
      </div>
      <Button
        colorScheme="blue"
        className="w-full"
        onClick={() => login({ email, password })}
      >
        Login
      </Button>
    </>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
