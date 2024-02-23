import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ id, password }) => {
    dispatch(asyncSetAuthUser({ id, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-5/12 xl:w-4/12 h-auto">
        <h2 className="text-3xl text-center font-bold mb-4">The Forum</h2>
        <form className="flex flex-col gap-3 items-center justify-center">
          <p className="text-center">
            <LoginInput login={onLogin} />
            Don’t have an account yet?
            <Link to="/register" className="font-bold text-blue-500 cursor-pointer hover:text-blue-700"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
