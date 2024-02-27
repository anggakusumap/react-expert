import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
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

const upVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.UP_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const downVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.DOWN_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const neutralVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.NEUTRAL_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const upVoteThreadDetailActionCreator = ({ threadId, userId }) => ({
  type: ActionType.UP_VOTE_THREAD_DETAIL,
  payload: {
    threadId,
    userId,
  },
});

const downVoteThreadDetailActionCreator = ({ threadId, userId }) => ({
  type: ActionType.DOWN_VOTE_THREAD_DETAIL,
  payload: {
    threadId,
    userId,
  },
});

const neutralVoteThreadDetailActionCreator = ({ threadId, userId }) => ({
  type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
  payload: {
    threadId,
    userId,
  },
});

const asyncGetThreadDetail = ({ threadId }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(receiveThreadDetailActionCreator(threadDetail));
  } catch (error) {
    toast.error(error.message);
  }

  dispatch(hideLoading());
};

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

const asyncUpVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.upVoteThread(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
  }
};

const asyncDownVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.downVoteThread(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
  }
};

const asyncNeutralVoteThreadDetail = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.neutralVoteThread(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
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
  asyncGetThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
};
