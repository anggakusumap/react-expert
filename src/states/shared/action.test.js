/**
 * skenario test
 *
 * - asyncPopulateUserAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call toast correctly when data fetching failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import asyncPopulateUserAndThreads from './action';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeThreadsResponse = [
  {
    id: 'thread-dcoSu782U14AwMy3',
    title: 'Judul',
    body: 'sahfuof uofgsdf disgf',
    category: 'category',
    createdAt: '2024-03-14T05:41:15.800Z',
    ownerId: 'user-3Sr6DgteCl3AGxxF',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUserAndThreads thunk', () => {
  beforeEach(() => {
    api.getAllUsersTest = api.getAllUsers;
    api.getAllThreadsTest = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api.getAllUsersTest;
    api.getAllThreads = api.getAllThreadsTest;

    // delete backup data
    delete api.getAllUsersTest;
    delete api.getAllThreadsTest;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUserAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call toast correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    vi.mock('react-toastify', () => ({
      toast: {
        error: vi.fn(),
      },
    }));

    // action
    await asyncPopulateUserAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
