/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import {
  asyncDownVoteThreadDetail,
  asyncGetThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteThreadDetail,
} from '../states/threadDetail/action';
import postedAt from '../utils/postedAt';
import CreateButton from '../components/CreateButton';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, authUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncGetThreadDetail({ threadId: id }));
  }, []);

  const isTalkLiked = threadDetail?.upVotesBy.includes(authUser.id);
  const isTalkDisliked = threadDetail?.downVotesBy.includes(authUser.id);

  const onLike = (threadId) => {
    if (isTalkLiked) {
      dispatch(asyncNeutralVoteThreadDetail(threadId));
    } else {
      dispatch(asyncUpVoteThreadDetail(threadId));
    }
  };

  const onDislike = (threadId) => {
    if (isTalkDisliked) {
      dispatch(asyncNeutralVoteThreadDetail(threadId));
    } else {
      dispatch(asyncDownVoteThreadDetail(threadId));
    }
  };

  return (
    <section className=" max-w-5xl p-4 mx-auto">
      { threadDetail
      && (
      <div className="flex flex-col gap-3">
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
                onLike(threadDetail.id);
              }}
            >
              <HandThumbUpIcon color={`${isTalkLiked ? 'green' : 'black'}`} className="w-6 scale-95 hover:scale-125 transition transform duration-100 ease-in" />
              {threadDetail.upVotesBy.length}
            </button>
            <button
              type="button"
              className="flex gap-1"
              onClick={() => {
                onDislike(threadDetail.id);
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
              <p>
                { threadDetail.owner.name }
              </p>
            </div>
          </div>
        </div>
      </div>
      ) }
      <CreateButton />
    </section>
  );
}

export default DetailPage;
