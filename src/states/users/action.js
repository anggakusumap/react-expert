import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

const receiveUsersActionCreator = (users) => ({
  type: ActionType.RECEIVE_USERS,
  payload: {
    users,
  },
});

const asyncRegisterUser = ({ name, email, password }) => async () => {
  try {
    await api.register({ name, email, password });
    toast.success('successs');
  } catch (error) {
    toast.error(error.message);
  }
};

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};
