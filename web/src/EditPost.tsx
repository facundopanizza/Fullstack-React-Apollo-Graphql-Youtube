import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEditPostMutation, usePostQuery } from './generated/graphql';

interface ParamTypes {
  id: string;
}

const EditPost = () => {
  const { id } = useParams<ParamTypes>();
  const { data, loading, error } = usePostQuery({
    variables: { id: Number(id) },
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editPostMutation] = useEditPostMutation();

  useEffect(() => {
    if (data && data.post) {
      setTitle(data.post.title);
      setDescription(data.post.description);
    }
  }, [data]);

  if (loading) {
    return <h3 className="text-xl font-bold">Loading...</h3>;
  }

  if (error) {
    return <h3 className="text-xl font-bold">{error.message}</h3>;
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    editPostMutation({
      variables: {
        id: Number(id),
        title,
        description,
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto border-2 border-gray-300 rounded shadow mt-3">
      <div className="bg-gray-300 p-2 flex justify-between">
        <div>Editar Post</div>
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
          editar post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
