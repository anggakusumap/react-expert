import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateButton from '../components/CreateButton';
import asyncPopulateUserAndThreads from '../states/shared/action';
import ThreadList from '../components/ThreadList';
import TopCategory from '../components/TopCategory';

function ListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUserAndThreads());
  }, [dispatch]);

  return (
    <section>
      <TopCategory />
      <div className="mx-auto md:max-w-5xl 2xl:max-w-7xl px-3 sm:px-6 lg:px-8 bg-white h-full">
        <ThreadList />
      </div>
      <CreateButton />
    </section>
  );
}

export default ListPage;
