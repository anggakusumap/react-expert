import React from 'react';

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-5/12 xl:w-4/12 h-auto">
        <h2 className="text-3xl text-center font-bold mb-4">The Forum</h2>
        <form className="flex flex-col gap-3 items-center justify-center">
          <div className="mb-4 w-full">
            <label htmlFor="username" className=" text-gray-700">
              Username
              <input type="text" name="username" id="username" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" required="" />

            </label>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-gray-700">
              Password
              <input type="text" name="password" id="password" className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5" required="" />
            </label>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 transition-colors w-full rounded-lg">Login</button>
          <p className="text-center">
            Don’t have an account yet?
            <span className="font-bold text-blue-500 cursor-pointer hover:text-blue-700"> Register</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
