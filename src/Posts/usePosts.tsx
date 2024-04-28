import { useCallback, useEffect, useRef, useState } from 'react';

const elementsPerPage = 10;

interface Post {
  id: number;
  title: string;
  body: string;
}

export function usePosts() {
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
    setPosts(data);
    pageNumber.current = pageNumber.current + 1;

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
  };
}
