/* eslint-disable react/no-danger */
import { ChatBubbleBottomCenterIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useSelector } from 'react-redux';
import postedAt from '../utils/postedAt';

function ThreadList() {
  const {
    threads = [],
    users = [],
  } = useSelector((states) => states);

  return (
    <div className="py-5">
      { threads.map((thread) => (
        <div key={thread.id} className="border-b-2 p-4 flex flex-col gap-5">
          <h2 className="text-2xl text-blue-900 font-semibold">{ thread.title }</h2>
          <p className="border p-2 rounded-lg w-fit">
            #
            {thread.category}
          </p>
          <h4 className=" text-base line-clamp-5" dangerouslySetInnerHTML={{ __html: thread.body }} />
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-1">
              <HandThumbUpIcon color="black" className="w-6" />
              {thread.upVotesBy.length}
            </div>
            <div className="flex gap-1">
              <HandThumbDownIcon color="black" className="w-6" />
              {thread.downVotesBy.length}
            </div>
            <div className="flex gap-1">
              <ChatBubbleBottomCenterIcon color="black" className="w-6" />
              {thread.totalComments}
            </div>
            <div className="flex">
              {postedAt(thread.createdAt)}
            </div>
            { users.length > 0
            && (
            <div className="flex gap-1">
              <p>
                by
                {' '}
                {users
                  .filter((user) => user.id === thread.ownerId)
                  .map((filteredUser) => filteredUser.name)}
              </p>
            </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThreadList;
