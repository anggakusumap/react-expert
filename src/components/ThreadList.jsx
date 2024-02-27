import React from 'react';
import { useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';

function ThreadList() {
  const {
    threads = [],
    users = [],
  } = useSelector((states) => states);

  return (
    <div className="pt-2 pb-10">
      { threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} users={users} />
      ))}
    </div>
  );
}

export default ThreadList;
