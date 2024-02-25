import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateButton from '../components/CreateButton';
import asyncPopulateUserAndThreads from '../states/shared/action';
import ThreadList from '../components/ThreadList';

function ListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUserAndThreads());
  }, [dispatch]);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white h-full">
        <ThreadList />
      </div>
      <CreateButton />
    </section>
  );
}

export default ListPage;
