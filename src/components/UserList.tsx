import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { UserSearch } from './UserSearch';

export function UserList() {
  const { users, searchTerm, usersLoading, error, selectedUser, fetchUsers, selectUser } =
    useAppStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (usersLoading) return <p role="status">Cargando usuarios...</p>;
  if (error && users.length === 0) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <UserSearch/>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?.id === user.id;
          return (
            <li key={user.id}>
              <button
                onClick={() => selectUser(user)}
                aria-pressed={isSelected}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: 6,
                  border: `1px solid ${isSelected ? '#646cff' : 'transparent'}`,
                  background: isSelected ? '#646cff22' : 'transparent',
                }}
              >
                {user.name} ({user.email})
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}