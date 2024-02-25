/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { ChatBubbleBottomCenterIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import postedAt from '../utils/postedAt';

function ThreadItem({ thread, users }) {
  return (
    <div key={thread.id} className="border-b-2 p-4 flex flex-col gap-5 hover:bg-stone-100 cursor-pointer">
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
  );
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  thread: PropTypes.shape(threadItemShape).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(userShape)).isRequired,
};

export default ThreadItem;
