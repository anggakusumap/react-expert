import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

function CreateButton() {
  return (
    <div className="fixed bottom-10 right-4 animate-bounce cursor-pointer">
      <Link to="/create-thread" type="button" className="bg-blue-600 hover:bg-blue-700 font-bold p-1 rounded-full">
        <PlusCircleIcon className="w-10" color="white" />
      </Link>
    </div>
  );
}

export default CreateButton;
