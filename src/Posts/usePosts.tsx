import { useCallback, useEffect, useRef, useState } from 'react';

const elementsPerPage = 10;

interface Post {
  id: number;
  title: string;
  body: string;
}

export function usePosts() {
  const loaderRef = useRef(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pageNumber = useRef(0);
  const totalNumberOfPosts = useRef<null | number>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    const start = pageNumber.current * elementsPerPage;
    const end = start + elementsPerPage;

    const params = new URLSearchParams({
      _start: String(start),
      _end: String(end),
    });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?${params.toString()}`,
    );
    totalNumberOfPosts.current = Number(response.headers.get('x-total-count'));

    const data = await response.json();
    setPosts((currentPosts) => {
      return [...(currentPosts || []), ...data];
    });
    pageNumber.current = pageNumber.current + 1;

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchPosts();
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
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    loaderRef,
  };
}
