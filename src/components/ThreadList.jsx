import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';

function ThreadList() {
  const {
    threads = [],
    users = [],
    categories: { selectedCategory },
  } = useSelector((states) => states);

  const [threadsTemp, setThreadsTemp] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const filteredThread = threads.filter((thread) => thread.category === selectedCategory);
      setThreadsTemp(filteredThread);
    } else {
      setThreadsTemp([]);
    }
  }, [selectedCategory]);

  return (
    <div className="pt-2 pb-10">
      { threadsTemp.length > 0
        ? (
          <>
            { threadsTemp.map((thread) => (
              <ThreadItem key={thread.id} thread={thread} users={users} />
            ))}
          </>
        ) : (
          <>
            { threads.map((thread) => (
              <ThreadItem key={thread.id} thread={thread} users={users} />
            ))}
          </>
        )}
    </div>
  );
}

export default ThreadList;
