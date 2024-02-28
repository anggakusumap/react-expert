/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { ChatBubbleBottomCenterIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postedAt from '../utils/postedAt';
import { asyncDownVoteThread, asyncNeutralVoteThread, asyncUpVoteThread } from '../states/threads/action';

function ThreadItem({ thread, users }) {
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const isTalkLiked = thread.upVotesBy.includes(authUser.id);
  const isTalkDisliked = thread.downVotesBy.includes(authUser.id);

  const onLike = (threadId) => {
    if (isTalkLiked) {
      dispatch(asyncNeutralVoteThread(threadId));
    } else {
      dispatch(asyncUpVoteThread(threadId));
    }
  };

  const onDislike = (threadId) => {
    if (isTalkDisliked) {
      dispatch(asyncNeutralVoteThread(threadId));
    } else {
      dispatch(asyncDownVoteThread(threadId));
    }
  };

  const onClickDetail = (threadId) => {
    navigateTo(`thread/${threadId}`);
  };

  return (
    <div
      role="button"
      tabIndex={0} // Add tabIndex to make the element focusable
      onClick={() => onClickDetail(thread.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClickDetail(thread.id);
        }
      }}
      key={thread.id}
      className="border-b-2 p-4 flex flex-col gap-5 hover:bg-stone-100 cursor-pointer"
    >
      <h2 className="text-2xl text-blue-900 font-semibold">{ thread.title }</h2>
      <p className="border p-2 rounded-lg w-fit">
        #
        {thread.category}
      </p>
      <h4 className=" text-base line-clamp-5" dangerouslySetInnerHTML={{ __html: thread.body }} />
      <div className="flex gap-3 flex-wrap">
        <button
          type="button"
          className="flex gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onLike(thread.id);
          }}
        >
          <HandThumbUpIcon color={`${isTalkLiked ? 'green' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
          {thread.upVotesBy.length}
        </button>
        <button
          type="button"
          className="flex gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onDislike(thread.id);
          }}
        >
          <HandThumbDownIcon color={`${isTalkDisliked ? 'red' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
          {thread.downVotesBy.length}
        </button>
        <button
          type="button"
          className="flex gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onClickDetail(thread.id);
          }}
        >
          <ChatBubbleBottomCenterIcon color="black" className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
          {thread.totalComments}
        </button>
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

export const threadItemShape = {
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

export const userShape = {
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
