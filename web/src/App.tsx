import React from 'react';
import { Link } from 'react-router-dom';
import { usePostsQuery } from './generated/graphql';
import Post from './Post';

function App() {
  const { data, error, loading } = usePostsQuery();

  if (loading) {
    return <h3 className="text-xl font-bold">Loading...</h3>;
  }

  if (error) {
    return <h3 className="text-xl font-bold">{error.message}</h3>;
  }

  const renderPosts = () => {
    if (data) {
      return data.posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
          />
        );
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-xl mx-auto my-3">
        <Link
          to="create-post"
          className="bg-green-400 text-blaack px-3 py-1 rounded">
          nuevo post
        </Link>
      </div>
      {renderPosts()}
    </div>
  );
}

export default App;
