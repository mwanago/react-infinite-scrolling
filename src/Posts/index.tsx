import { usePostsLoading } from './usePostsLoading';

export const Posts = () => {
  const { posts, loaderRef, isLoadingFinished } = usePostsLoading();

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
      {!isLoadingFinished && <div ref={loaderRef}>Loading...</div>}
    </div>
  );
};
