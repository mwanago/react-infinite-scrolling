const elementsPerPage = 20;

export async function fetchPosts(pageNumber: number) {
  const start = pageNumber * elementsPerPage;
  const end = start + elementsPerPage;

  const params = new URLSearchParams({
    _start: String(start),
    _end: String(end),
  });

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${params.toString()}`,
  );

  const totalNumberOfPosts = Number(response.headers.get('x-total-count'));

  const posts = await response.json();

  return {
    posts,
    totalNumberOfPosts,
  };
}
