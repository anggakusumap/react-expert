import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function ThreadInput() {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleCreate = () => {
    try {
      const success = dispatch(asyncAddThread({ title, body, category }));
      if (success) {
        navigateTo('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <label htmlFor="title" className="text-gray-700">
        Title
        <input
          type="text"
          value={title}
          onChange={onTitleChange}
          name="title"
          id="title"
          className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
        />
      </label>
      <label htmlFor="category" className="text-gray-700">
        Category
        <input
          type="text"
          value={category}
          onChange={onCategoryChange}
          name="category"
          id="category"
          className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5"
        />
      </label>
      <label htmlFor="body" className="text-gray-700">
        Body
        <textarea
          value={body}
          onChange={onBodyChange}
          name="body"
          id="body"
          className="border border-gray-300 sm:text-sm rounded-lg block w-full p-10"
        />
      </label>
      <div className="flex justify-between">
        <Link to="/" type="button" className="border py-2 px-10 rounded-lg bg-red-500 text-white">
          Back
        </Link>
        <button onClick={handleCreate} type="button" className="border py-2 px-10 rounded-lg bg-sky-500 text-white animate-bounce">
          Create
        </button>
      </div>
    </>
  );
}

export default ThreadInput;
