import React from 'react';
import { useSelector } from 'react-redux';

function LeaderboardsList() {
  const {
    leaderboards = [],
  } = useSelector((states) => states);

  return (
    <div className=" flex flex-col gap-3 py-10 px-4">
      <h1 className="capitalize text-2xl font-semibold text-blue-900 text-center">Active user rankings</h1>
      { leaderboards.map((leaderboard) => (
        <div key={leaderboard.user.id} className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img className="rounded-full" src={leaderboard.user.avatar} alt={leaderboard.user.name} />
            <div>
              <h4 className="font-semibold text-blue-700">{leaderboard.user.name}</h4>
              <p>{leaderboard.user.email}</p>
            </div>
          </div>
          <p className="text-xl font-medium">{leaderboard.score}</p>
        </div>
      )) }
    </div>
  );
}

export default LeaderboardsList;
