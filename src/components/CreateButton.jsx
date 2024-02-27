import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

function CreateButton() {
  return (
    <div className="fixed bottom-10 right-4 animate-bounce cursor-pointer">
      <div type="button" className="bg-blue-600 hover:bg-blue-700 font-bold p-1 rounded-full">
        <PlusCircleIcon className="w-10" color="white" />
      </div>
    </div>
  );
}

export default CreateButton;
