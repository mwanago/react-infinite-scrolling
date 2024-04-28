import { usePosts } from './usePosts.tsx';
import { useRef } from 'react';

export const Posts = () => {
  const loaderRef = useRef(null);
  const { posts } = usePosts();

  return (
    <div>
      {posts?.map((post) => (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      <div ref={loaderRef}>Loading...</div>
    </div>
  );
};
