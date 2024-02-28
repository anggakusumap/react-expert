/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import postedAt from '../utils/postedAt';
import { threadItemShape, userShape } from './ThreadItem';
import { asyncDownVoteThreadDetail, asyncNeutralVoteThreadDetail, asyncUpVoteThreadDetail } from '../states/threadDetail/action';
import CommentInput from './CommentInput';

function ThreadDetail({ threadDetail, authUser }) {
  const dispatch = useDispatch();

  const isTalkLiked = threadDetail?.upVotesBy.includes(authUser.id);
  const isTalkDisliked = threadDetail?.downVotesBy.includes(authUser.id);

  const onLikeThread = (threadId) => {
    if (isTalkLiked) {
      dispatch(asyncNeutralVoteThreadDetail(threadId));
    } else {
      dispatch(asyncUpVoteThreadDetail(threadId));
    }
  };

  const onDislikeThread = (threadId) => {
    if (isTalkDisliked) {
      dispatch(asyncNeutralVoteThreadDetail(threadId));
    } else {
      dispatch(asyncDownVoteThreadDetail(threadId));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="border p-2 rounded-lg w-fit">
        #
        {threadDetail.category}
      </p>
      <h2 className="text-2xl text-blue-900 font-semibold">{ threadDetail.title }</h2>
      <h4 className=" text-base" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />
      <div className="flex gap-3 flex-wrap">
        <div className="flex gap-2 items-center flex-wrap">
          <button
            type="button"
            className="flex gap-1"
            onClick={() => {
              onLikeThread(threadDetail.id);
            }}
          >
            <HandThumbUpIcon color={`${isTalkLiked ? 'green' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
            {threadDetail.upVotesBy.length}
          </button>
          <button
            type="button"
            className="flex gap-1"
            onClick={() => {
              onDislikeThread(threadDetail.id);
            }}
          >
            <HandThumbDownIcon color={`${isTalkDisliked ? 'red' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
            {threadDetail.downVotesBy.length}
          </button>
          <p>
            {postedAt(threadDetail.createdAt)}
          </p>
          <div className="flex flex-wrap gap-1 items-center">
            {' '}
            by
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="rounded-full w-8" />
            <p className="font-semibold">
              { threadDetail.owner.name }
            </p>
          </div>
        </div>
      </div>
      <CommentInput threadDetail={threadDetail} />
    </div>
  );
}

ThreadDetail.propTypes = {
  threadDetail: PropTypes.shape(threadItemShape).isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
};

export default ThreadDetail;
