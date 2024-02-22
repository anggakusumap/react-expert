import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

const receiveThreadsActionCreator = (threads) => ({
  type: ActionType.RECEIVE_THREADS,
  payload: {
    threads,
  },
});

const addThreadActionCreator = (thread) => ({
  type: ActionType.ADD_THREAD,
  payload: {
    thread,
  },
});

const upVoteThreadActionCreator = (threadId, userId) => ({
  type: ActionType.UP_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const downVoteThreadActionCreator = (threadId, userId) => ({
  type: ActionType.DOWN_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const neutralVoteThreadActionCreator = (threadId, userId) => ({
  type: ActionType.NEUTRAL_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const asyncAddThread = ({ title, body, category }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThreadActionCreator(thread));
  } catch (error) {
    toast.error(error.message);
  }

  dispatch(hideLoading());
};

const asyncUpVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.upVoteThread(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
  }
};

const asyncDownVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.downVoteThread(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
  }
};

const asyncNeutralVoteThread = (threadId) => async (dispatch, getState) => {
  const { authUser } = getState();
  dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));

  try {
    await api.neutralVoteThread(threadId);
  } catch (error) {
    toast.error(error.message);
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
  }
};

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
