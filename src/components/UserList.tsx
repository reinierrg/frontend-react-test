import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function UserList() {
  const { users, searchTerm, loading, error, fetchUsers, selectUser } = useAppStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p role="status">Cargando usuarios...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <button onClick={() => selectUser(user)}>
              {user.name} ({user.email})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}