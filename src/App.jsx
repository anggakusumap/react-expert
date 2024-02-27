import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { asyncPreloadProcess } from './states/isPreload/action';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LeaderboardsPage from './pages/LeaderboardsPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const {
    authUser = null,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

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
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/talks/:id" element={<DetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/create-thread" element={<CreateThreadPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
