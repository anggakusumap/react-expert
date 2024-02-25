import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { asyncGetLeaderboards } from '../states/leaderboards/action';
import CreateButton from '../components/CreateButton';

function LeaderboardsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <section>
      <div className="mx-auto max-w-3xl px-2 sm:px-6 lg:px-8 bg-white h-full">
        <LeaderboardsList />
      </div>
      <CreateButton />
    </section>
  );
}

export default LeaderboardsPage;
