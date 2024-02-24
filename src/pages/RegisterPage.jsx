import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-5/12 xl:w-4/12 h-auto">
          <h2 className="text-3xl text-center font-bold mb-4">The Forum</h2>
          <form className="flex flex-col gap-3 items-center justify-center w-full">
            <RegisterInput register={onRegister} />
          </form>
          <p className="text-center mt-5">
            Already have an account?
            <Link to="/" className="font-bold text-blue-500 cursor-pointer hover:text-blue-700"> Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
