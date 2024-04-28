import { useCallback, useRef, useState } from 'react';
import { fetchPosts } from './fetchPosts';
import { Post } from './Post';

export function usePostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const pageNumber = useRef(0);
  const isLoading = useRef(false);
  const [totalNumberOfPosts, setTotalNumberOfPosts] = useState<null | number>(
    null,
  );

  const loadNextPage = useCallback(async () => {
    if (isLoading.current) {
      return;
    }
    isLoading.current = true;

    const { posts, totalNumberOfPosts } = await fetchPosts(pageNumber.current);
    pageNumber.current = pageNumber.current + 1;

    setPosts((currentPosts) => {
      return [...currentPosts, ...posts];
    });
    setTotalNumberOfPosts(totalNumberOfPosts);

    isLoading.current = false;
  }, []);

  const areAllPostsFetched = posts.length === totalNumberOfPosts;

  return {
    loadNextPage,
    areAllPostsFetched,
    posts,
  };
}
