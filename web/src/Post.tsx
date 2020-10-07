import React from 'react';
import { Link } from 'react-router-dom';
import { useDeletePostMutation } from './generated/graphql';

const Post = ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const [deletePostMutation] = useDeletePostMutation();

  const deletePost = async () => {
    await deletePostMutation({
      variables: { id },
      update: (cache) => {
        cache.evict({ id: 'Post:' + id });
      },
    });
  };

  return (
    <div className="shadow rounded mb-3 max-w-xl mx-auto">
      <div className="bg-gray-300 p-2 flex justify-between">
        <div>{title}</div>
        <div>
          <button className="rounded bg-blue-300 py-1 px-3 mr-2">
            <Link className="w-full h-full" to={`/edit/${id}`}>
              editar
            </Link>
          </button>
          <button onClick={deletePost} className="rounded bg-red-300 py-1 px-3">
            borrar
          </button>
        </div>
      </div>
      <div className="p-2">{description}</div>
    </div>
  );
};

export default Post;
