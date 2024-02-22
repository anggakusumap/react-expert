export default function api() {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  const putAccessToken = (token) => localStorage.setItem('accessToken', token);

  const getAccessToken = () => localStorage.getItem('accessToken');

  const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.json();
  };

  const register = async ({ name, email, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const { status, message, data: { user } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return user;
  };

  const login = async ({ id, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    const { status, message, data: { token } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return token;
  };

  const getOwnProfile = async () => {
    const { status, message, data: { user } } = await fetchWithAuth(`${BASE_URL}/users/me`);

    if (status !== 'success') throw new Error(message);

    return user;
  };

  const getAllUsers = async () => {
    const { status, message, data: { users } } = await fetch(`${BASE_URL}/users`);

    if (status !== 'success') throw new Error(message);

    return users;
  };

  const createThread = async ({ title, body, category }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const { status, message, data: { thread } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return thread;
  };

  const getAllThreads = async () => {
    const response = await fetch(`${BASE_URL}/threads`);

    const { status, message, data: { threads } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return threads;
  };

  const getThreadDetail = async (id) => {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const { status, message, data: { detailThread } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return detailThread;
  };

  const createComment = async ({ content, threadId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });

    const { status, message, data: { comment } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return comment;
  };

  const upVoteThread = async ({ threadId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { status, message, data: { vote } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return vote;
  };

  const downVoteThread = async ({ threadId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { status, message, data: { vote } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return vote;
  };

  const neutralVoteThread = async ({ threadId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { status, message, data: { vote } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return vote;
  };

  const upVoteComment = async ({ commentId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${commentId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { status, message, data: { vote } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return vote;
  };

  const downVoteComment = async ({ commentId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${commentId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { status, message, data: { vote } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return vote;
  };

  const neutralVoteComment = async ({ commentId }) => {
    const response = await fetchWithAuth(`${BASE_URL}/threads/${commentId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { status, message, data: { vote } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return vote;
  };

  const getLeaderboards = async () => {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const { status, message, data: { leaderboards } } = await response.json();

    if (status !== 'success') throw new Error(message);

    return leaderboards;
  };

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
}
