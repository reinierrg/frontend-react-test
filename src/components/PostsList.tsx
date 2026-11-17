import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function PostList() {
  const { selectedUser, posts, loading, error, fetchPosts } = useAppStore();

  useEffect(() => {
    if (selectedUser) fetchPosts(selectedUser.id);
  }, [selectedUser, fetchPosts]);

  if (!selectedUser) return <p>Selecciona un usuario</p>;
  if (loading) return <p role="status">Cargando publicaciones...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <h2>Publicaciones de {selectedUser.name}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}