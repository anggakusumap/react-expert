/* eslint-disable max-len */
/**
 * skenario test
 *
 * - asyncGetLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast correctly when data fetching failed
 */

import
{
  describe,
  beforeEach,
  afterEach,
  it,
  vi,
  expect,
} from 'vitest';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  asyncGetLeaderboards,
  receiveLeaderboardsActionCreator,
} from './action';

const fakeLeaderboardsResponse = [
  {
    id: '1',
    name: 'User 1',
    score: 100,
  },
  {
    id: '2',
    name: 'User 2',
    score: 90,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncGetLeaderboards thunk', () => {
  beforeEach(() => {
    api.getLeaderboardsTest = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api.getLeaderboardsTest;

    // delete backup data
    delete api.getLeaderboardsTest;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncGetLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse));
  });

  it('should dispatch action and call toast correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    vi.mock('react-toastify', () => ({
      toast: {
        error: vi.fn(),
      },
    }));

    // action
    await asyncGetLeaderboards()(dispatch);

    // assert
    expect(toast.error).toHaveBeenCalled();
  });
});
