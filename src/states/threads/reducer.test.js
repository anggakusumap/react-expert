/**
* test scenario for threadsReducer
*
* - threadReducers function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREADS action
*  - should return the threads with the new thread when given by ADD_THREAD action
*  - should correctly upvote a thread when given an UP_VOTE_THREAD action
*  - should correctly downvote a thread when given a DOWN_VOTE_THREAD action
*  - should correctly neutralize votes on a thread when given a NEUTRAL_VOTE_THREAD action
*
*/

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            thread: 'Threads Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2024-03-03',
          },
          {
            id: 'thread-2',
            thread: 'Threads Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2024-03-03',
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        text: 'Thread Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2024-03-03',
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          text: 'Thread Test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2024-03-03',
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should correctly upvote a thread when given an UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        text: 'Thread Test 1',
        user: 'user-1',
        replyTo: '',
        upVotesBy: [],
        downVotesBy: [],
        createdAt: '2024-03-03',
      },
    ];
    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState[0].upVotesBy).toEqual(['user-2']);
  });

  it('should correctly downvote a thread when given a DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        text: 'Thread Test 1',
        user: 'user-1',
        replyTo: '',
        upVotesBy: [],
        downVotesBy: [],
        createdAt: '2024-03-03',
      },
    ];
    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState[0].downVotesBy).toEqual(['user-2']);
  });

  it('should correctly neutralize votes on a thread when given a NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        text: 'Thread Test 1',
        user: 'user-1',
        replyTo: '',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        createdAt: '2024-03-03',
      },
    ];
    const action = {
      type: 'NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual([]);
  });
});
