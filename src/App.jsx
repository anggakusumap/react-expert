import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action';
// import { asyncUnsetAuthUser } from './states/authUser/action';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // const onSignOut = () => {
  //   dispatch(asyncUnsetAuthUser());
  // };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          {/* <Navigation authUser={authUser} signOut={onSignOut} /> */}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/talks/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
