import './App.css'
import { PostList } from './components/PostsList';
import { UserList } from './components/UserList';
import { useAppStore } from './store/useAppStore';

function App() {
  const { selectedUser, error, clearError } = useAppStore();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, display: 'flex', flexDirection:'column'}}>
      <h1>Lista de usuarios</h1>

      {error && (
        <div role="alert" style={{ background: '#fee', padding: 10 }}>
          {error} <button onClick={clearError}>Cerrar</button>
        </div>
      )}
      <UserList />
      {selectedUser && (
          <PostList />
      )}
      
      
    </div>
  );
}


export default App
