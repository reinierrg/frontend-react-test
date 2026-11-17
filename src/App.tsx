import './App.css'
import { PostList } from './components/PostsList';
import { UserList } from './components/UserList';
import { useAppStore } from './store/useAppStore';

function App() {
  const { selectedUser, error, clearError } = useAppStore();

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 20, display: 'flex', flexDirection:'column'}}>
      <h1>Lista de usuarios</h1>

      {error && (
        <div role="alert" style={{ background: '#fee', padding: 10 }}>
          {error} <button onClick={clearError}>Cerrar</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 320px' }}>
          <UserList />
        </div>
        {selectedUser && (
          <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PostList key={selectedUser.id} />
          </div>
        )}
      </div>
      
      
    </div>
  );
}


export default App
