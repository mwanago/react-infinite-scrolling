import { useCallback, useEffect, useRef, useState } from 'react';

const elementsPerPage = 10;

export function usePosts() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pageNumber = useRef(0);

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
    const totalNumberOfPosts = Number(response.headers.get('x-total-count'));

    const data = await response.json();
    setPosts(data);

    setIsLoading(false);
    console.log(response, totalNumberOfPosts);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
  };
}
