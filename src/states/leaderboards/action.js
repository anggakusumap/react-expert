import { toast } from 'react-toastify';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

const asyncGetLeaderboards = () => async (dispatch) => {
  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(receiveLeaderboardsActionCreator(leaderboards));
  } catch (error) {
    toast.error(error.message);
  }
};

export
{
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncGetLeaderboards,
};
