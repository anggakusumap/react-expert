import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [id, onIdChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <>
      <div className="mb-4 w-full">
        <label htmlFor="username" className=" text-gray-700">
          Username
          <input type="text" value={id} onChange={onIdChange} name="username" id="username" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" required="" />

        </label>
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="password" className="block text-gray-700">
          Password
          <input type="text" value={password} onChange={onPasswordChange} name="password" id="password" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" required="" />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition-colors w-full rounded-lg"
        onClick={() => login({ id, password })}
      >
        Login
      </button>
    </>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
