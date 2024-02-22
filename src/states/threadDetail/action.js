import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

const receiveThreadDetailActionCreator = (threadDetail) => ({
  type: ActionType.RECEIVE_THREAD_DETAIL,
  payload: {
    threadDetail,
  },
});

const addCommentActionCreator = (comment) => ({
  type: ActionType.CREATE_COMMENT,
  payload: {
    comment,
  },
});

const upVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.UP_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const downVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.DOWN_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const neutralVoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.NEUTRAL_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const asyncAddComment = ({ content, threadId }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const thread = await api.createComment({ content, threadId });
    dispatch(addCommentActionCreator(thread));
  } catch (error) {
    toast.error(error.message);
  }

  dispatch(hideLoading());
};

const asyncUpVoteComment = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(upVoteCommentActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.upVoteComment(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(upVoteCommentActionCreator({ threadId, userId: authUser.id }));
  }
};

const asyncDownVoteComment = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(downVoteCommentActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.downVoteComment(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(downVoteCommentActionCreator({ threadId, userId: authUser.id }));
  }
};

const asyncNeutralVoteComment = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(neutralVoteCommentActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.neutralVoteComment(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(neutralVoteCommentActionCreator({ threadId, userId: authUser.id }));
  }
};

export
{
  ActionType,
  receiveThreadDetailActionCreator,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
