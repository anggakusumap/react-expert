import React from 'react';
import ThreadInput from '../components/ThreadInput';

function CreateThreadPage() {
  return (
    <section className="flex flex-col p-4 gap-8 max-w-4xl mx-auto">
      <h1 className="text-center text-2xl text-blue-900 font-bold">Create New Thread</h1>
      <ThreadInput />
    </section>
  );
}

export default CreateThreadPage;
