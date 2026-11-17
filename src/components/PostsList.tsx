import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { NewPostForm } from './NewPostForm';

export function PostList() {
  const { selectedUser, posts, postsLoading, error, fetchPosts } = useAppStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedUser) fetchPosts(selectedUser.id);
  }, [selectedUser, fetchPosts]);

  if (!selectedUser) return <p>Selecciona un usuario</p>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h2 style={{ margin: 0 }}>Publicaciones de {selectedUser.name}</h2>
        <button onClick={() => setShowForm((open) => !open)}>
          {showForm ? 'Cancelar' : 'Agregar post'}
        </button>
      </div>

      {showForm ? (
        <NewPostForm onSaved={() => setShowForm(false)} />
      ) : postsLoading ? (
        <p role="status">Cargando publicaciones...</p>
      ) : error ? (
        <p role="alert">Error: {error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
