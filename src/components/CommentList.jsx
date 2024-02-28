import React from 'react';
import PropTypes from 'prop-types';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { threadItemShape, userShape } from './ThreadItem';
import postedAt from '../utils/postedAt';
import { asyncDownVoteComment, asyncNeutralVoteComment, asyncUpVoteComment } from '../states/threadDetail/action';

function CommentList({ threadDetail, authUser }) {
  const dispatch = useDispatch();
  const onLikeComment = ({ threadId, commentId, isLikedComment }) => {
    if (isLikedComment) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId }));
    } else {
      dispatch(asyncUpVoteComment({ threadId, commentId }));
    }
  };

  const onDislikeComment = ({ threadId, commentId, isDislikedComment }) => {
    if (isDislikedComment) {
      dispatch(asyncNeutralVoteComment({ threadId, commentId }));
    } else {
      dispatch(asyncDownVoteComment({ threadId, commentId }));
    }
  };

  return (
    <div className="border-t-2 my-5 py-5">
      <h3 className="text-lg font-semibold">
        Comment
        {' '}
        (
        {threadDetail.comments.length}
        )
      </h3>

      { threadDetail.comments.map((comment) => (
        <div key={comment.id} className="flex flex-col gap-3 border-b-2 py-5">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-1 items-center">
              <img src={comment.owner.avatar} alt={comment.owner.name} className="rounded-full w-8" />
              <p className="font-semibold">
                { comment.owner.name }
              </p>
            </div>
            <p>
              {postedAt(comment.createdAt)}
            </p>
          </div>
          <p>{ comment.content }</p>
          <div className="flex gap-2 items-center flex-wrap">
            <button
              type="button"
              className="flex gap-1"
              onClick={() => {
                const isLikedComment = comment?.upVotesBy.includes(authUser.id);
                onLikeComment({
                  threadId: threadDetail.id, commentId: comment.id, isLikedComment,
                });
              }}
            >
              <HandThumbUpIcon color={`${comment?.upVotesBy.includes(authUser.id) ? 'green' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
              {comment.upVotesBy.length}
            </button>
            <button
              type="button"
              className="flex gap-1"
              onClick={() => {
                const isDislikedComment = comment?.downVotesBy.includes(authUser.id);
                onDislikeComment({
                  threadId: threadDetail.id, commentId: comment.id, isDislikedComment,
                });
              }}
            >
              <HandThumbDownIcon color={`${comment?.downVotesBy.includes(authUser.id) ? 'red' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
              {comment.downVotesBy.length}
            </button>
          </div>
        </div>
      )) }
    </div>
  );
}

CommentList.propTypes = {
  threadDetail: PropTypes.shape(threadItemShape).isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
};

export default CommentList;
