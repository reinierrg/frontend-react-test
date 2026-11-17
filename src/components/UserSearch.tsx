import { useAppStore } from '../store/useAppStore';

export function UserSearch() {
  const { searchTerm, setSearchTerm } = useAppStore();

  return (
    <input
      type="text"
      placeholder="Buscar usuarios por nombre..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label="Buscar usuarios"
    />
  );
}