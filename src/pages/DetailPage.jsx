import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetThreadDetail,
} from '../states/threadDetail/action';
import CreateButton from '../components/CreateButton';
import ThreadDetail from '../components/ThreadDetail';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, authUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncGetThreadDetail({ threadId: id }));
  }, []);

  return (
    <section className=" max-w-5xl p-4 mx-auto">
      { (threadDetail && authUser)
        && (
        <>
          <ThreadDetail threadDetail={threadDetail} authUser={authUser} />
          <CommentList threadDetail={threadDetail} authUser={authUser} />
        </>
        ) }
      <CreateButton />
    </section>
  );
}

export default DetailPage;
