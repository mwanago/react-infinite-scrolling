import { useEffect, useRef } from 'react';
import { usePostPages } from './usePostPages';

export function usePostsLoading() {
  const loaderRef = useRef(null);

  const { posts, loadNextPage, areAllPostsFetched } = usePostPages();

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
    areAllPostsFetched,
  };
}
