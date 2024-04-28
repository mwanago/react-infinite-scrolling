import { usePosts } from './usePosts.tsx';

export const Posts = () => {
  const { posts, loaderRef, isFinished } = usePosts();

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {!isFinished && <div ref={loaderRef}>Loading...</div>}
    </div>
  );
};
