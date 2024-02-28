import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { asyncAddComment } from '../states/threadDetail/action';
import { threadItemShape } from './ThreadItem';

function CommentInput({ threadDetail }) {
  const dispatch = useDispatch();
  const [addComment, onAddComment, setComment] = useInput('');

  const handleAddComment = () => {
    dispatch(asyncAddComment({ content: addComment, threadId: threadDetail.id }));
    setComment('');
  };

  return (
    <>
      <label htmlFor="body" className="text-gray-700 font-semibold">
        Write your comment
        <textarea
          value={addComment}
          onChange={onAddComment}
          name="body"
          id="body"
          className="border border-gray-300 sm:text-sm rounded-lg block w-full h-44 p-2"
        />
      </label>
      <button onClick={handleAddComment} type="button" className="border py-2 px-10 rounded-lg bg-sky-500 text-white w-full">
        Add Comment
      </button>
    </>
  );
}

CommentInput.propTypes = {
  threadDetail: PropTypes.shape(threadItemShape).isRequired,
};

export default CommentInput;
