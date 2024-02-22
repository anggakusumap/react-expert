import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const asyncPopulateUserAndThreads = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    const users = await api.getAllUsers();
    const threads = await api.getAllThreads();

    dispatch(receiveUsersActionCreator(users));
    dispatch(receiveThreadsActionCreator(threads));
  } catch (error) {
    toast.error(error.message);
  }
  dispatch(hideLoading());
};

export default asyncPopulateUserAndThreads;
