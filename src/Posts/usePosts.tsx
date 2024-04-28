import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from './Post';
import { fetchPosts } from './fetchPosts';

export function usePosts() {
  const loaderRef = useRef(null);
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

  const isFinished = posts.length === totalNumberOfPosts;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadNextPage]);

  return {
    posts,
    loaderRef,
    isFinished,
  };
}
