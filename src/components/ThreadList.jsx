/* eslint-disable react/no-danger */
import React from 'react';
import { useSelector } from 'react-redux';

function ThreadList() {
  const {
    threads = [],
  } = useSelector((states) => states);

  return (
    <div className="py-5">
      { threads.map((thread) => (
        <div key={thread.id} className="border-b-2 p-4 flex flex-col gap-3">
          <h2 className="text-2xl text-blue-900 font-semibold">{ thread.title }</h2>
          <p className="border p-2 rounded-lg w-fit">
            #
            {thread.category}
          </p>
          <h4 className=" text-base" dangerouslySetInnerHTML={{ __html: thread.body }} />
        </div>
      ))}
    </div>
  );
}

export default ThreadList;
