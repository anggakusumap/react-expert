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

const asyncRegisterUser = ({ id, name, password }) => async () => {
  try {
    await api.register({ id, name, password });
  } catch (error) {
    toast.error(error.message);
  }
};

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};
