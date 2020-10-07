import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreatePostMutation } from './generated/graphql';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createPostMutation] = useCreatePostMutation();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    createPostMutation({
      variables: {
        title,
        description,
      },
      update: (cache) => {
        cache.evict({ fieldName: 'posts' });
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto border-2 border-gray-300 rounded shadow mt-3">
      <div className="bg-gray-300 p-2 flex justify-between">
        <div>Nuevo Post</div>
        <Link to="/" className="float-right rounded bg-blue-300 px-3 py-1">
          atras
        </Link>
      </div>

      <form onSubmit={onFormSubmit} className="p-2">
        <div className="mb-2">
          <label htmlFor="title">Titulo</label>
          <input
            id="title"
            type="text"
            className="w-full border rounded block"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description">Descripcion</label>
          <input
            id="description"
            type="text"
            className="w-full border rounded block"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="bg-green-400 text-black rounded px-3 py-1">
          crear post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
