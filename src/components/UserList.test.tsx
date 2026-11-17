import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserList } from './UserList'
import { useAppStore } from '../store/useAppStore'
import { getUsers } from '../services/api'
import type { User } from '../types'

vi.mock('../services/api')

const users: User[] = [
  { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
  { id: 2, name: 'Ervin Howell', email: 'ervin@example.com' },
]

const usersResponse = { data: users } as Awaited<ReturnType<typeof getUsers>>

describe('UserList', () => {
  beforeEach(() => {
    vi.mocked(getUsers).mockResolvedValue(usersResponse)
    useAppStore.setState({
      users,
      selectedUser: null,
      posts: [],
      searchTerm: '',
      usersLoading: false,
      postsLoading: false,
      error: null,
    })
  })

  it('muestra los usuarios que devuelve la API', async () => {
    render(<UserList />)

    expect(await screen.findByText(/Leanne Graham/)).toBeInTheDocument()
    expect(screen.getByText(/Ervin Howell/)).toBeInTheDocument()
  })

  it('filtra por nombre al escribir en el buscador', async () => {
    render(<UserList />)
    await screen.findByText(/Leanne Graham/)

    await userEvent.type(screen.getByLabelText('Buscar usuarios'), 'ervin')

    expect(screen.getByText(/Ervin Howell/)).toBeInTheDocument()
    expect(screen.queryByText(/Leanne Graham/)).not.toBeInTheDocument()
  })

  it('marca el usuario seleccionado', async () => {
    render(<UserList />)

    const button = await screen.findByRole('button', { name: /Leanne Graham/ })
    await userEvent.click(button)

    expect(useAppStore.getState().selectedUser).toEqual(users[0])
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('muestra el error cuando falla la carga de usuarios', async () => {
    vi.mocked(getUsers).mockRejectedValue(new Error('network'))
    useAppStore.setState({ users: [] })

    render(<UserList />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Error al cargar usuarios'
    )
  })
})
