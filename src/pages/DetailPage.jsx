/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import {
  asyncAddComment,
  asyncDownVoteThreadDetail,
  asyncGetThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/action';
import postedAt from '../utils/postedAt';
import CreateButton from '../components/CreateButton';
import useInput from '../hooks/useInput';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, authUser } = useSelector((state) => state);
  const [addComment, onAddComment, setComment] = useInput('');

  useEffect(() => {
    dispatch(asyncGetThreadDetail({ threadId: id }));
  }, []);

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

  const handleAddComment = () => {
    dispatch(asyncAddComment({ content: addComment, threadId: threadDetail.id }));
    setComment('');
  };

  return (
    <section className=" max-w-5xl p-4 mx-auto">
      { threadDetail
        && (
        <>
          <div className="flex flex-col gap-4">
            <p className="border p-2 rounded-lg w-fit">
              #
              {threadDetail.category}
            </p>
            <h2 className="text-2xl text-blue-900 font-semibold">{ threadDetail.title }</h2>
            <h4 className=" text-base line-clamp-5" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />
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
          </div>
          <div className="border-t-2 my-5 py-5">
            <h3 className="text-lg font-semibold">
              Comment
              {' '}
              (
              {threadDetail.comments.length}
              )
            </h3>

            { threadDetail.comments.map((comment) => (
              <div className="flex flex-col gap-3 border-b-2 py-5">
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
                </div>
              </div>
            )) }
          </div>
        </>
        ) }
      <CreateButton />
    </section>
  );
}

export default DetailPage;
