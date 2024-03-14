/* eslint-disable max-len */

/**
* test scenario for threadDetailReducer
*
* - threadDetailReducer function
*  - should return the initial state when given by unknown action
*  - should return the thread detail when given a RECEIVE_THREAD_DETAIL action
*  - should return the thread detail with the new comment when given a CREATE_COMMENT action
*  - should up vote a comment when given an UP_VOTE_COMMENT action
*  - should down vote a comment when given a DOWN_VOTE_COMMENT action
*  - should neutral vote a comment when given a NEUTRAL_VOTE_COMMENT action
*  - should up vote the thread detail when given an UP_VOTE_THREAD_DETAIL action
*  - should down vote the thread detail when given a DOWN_VOTE_THREAD_DETAIL action
*  - should neutral vote the thread detail when given a NEUTRAL_VOTE_THREAD_DETAIL action
*
*/

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given a RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          text: 'Thread Detail Test',
          comments: [],
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2024-03-03',
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread detail with the new comment when given a CREATE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          text: 'Comment Test',
          user: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2024-03-03',
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.comments.length).toEqual(initialState.comments.length + 1);
    expect(nextState.comments[0]).toEqual(action.payload.comment);
  });

  it('should up vote a comment when given an UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [
        {
          id: 'comment-1',
          text: 'Comment Test',
          user: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2024-03-03',
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    const updatedComment = nextState.comments.find((comment) => comment.id === action.payload.commentId);
    expect(updatedComment.upVotesBy).toContain(action.payload.userId);
  });

  it('should down vote a comment when given a DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [
        {
          id: 'comment-1',
          text: 'Comment Test',
          user: 'user-1',
          upVotesBy: [],
          downVotesBy: [],
          createdAt: '2024-03-03',
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    const updatedComment = nextState.comments.find((comment) => comment.id === action.payload.commentId);
    expect(updatedComment.downVotesBy).toContain(action.payload.userId);
  });

  it('should neutral vote a comment when given a NEUTRAL_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [
        {
          id: 'comment-1',
          text: 'Comment Test',
          user: 'user-1',
          upVotesBy: ['user-2'],
          downVotesBy: ['user-3'],
          createdAt: '2024-03-03',
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'NEUTRAL_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    const updatedComment = nextState.comments.find((comment) => comment.id === action.payload.commentId);
    expect(updatedComment.upVotesBy).not.toContain(action.payload.userId);
    expect(updatedComment.downVotesBy).not.toContain(action.payload.userId);
  });

  it('should up vote the thread detail when given an UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.upVotesBy).toContain(action.payload.userId);
  });

  it('should down vote the thread detail when given a DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.downVotesBy).toContain(action.payload.userId);
  });

  it('should neutral vote the thread detail when given a NEUTRAL_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      text: 'Thread Detail Test',
      comments: [],
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: ['user-3'],
      createdAt: '2024-03-03',
    };
    const action = {
      type: 'NEUTRAL_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'user-1',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState.upVotesBy).not.toContain(action.payload.userId);
    expect(nextState.downVotesBy).not.toContain(action.payload.userId);
  });
});
