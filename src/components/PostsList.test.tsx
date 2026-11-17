import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostList } from './PostsList'
import { useAppStore } from '../store/useAppStore'
import { getPostsByUser } from '../services/api'
import type { Post } from '../types'

vi.mock('../services/api')

const posts: Post[] = [
  { userId: 1, id: 1, title: 'Publicación uno', body: 'Cuerpo uno' },
  { userId: 1, id: 2, title: 'Publicación dos', body: 'Cuerpo dos' },
]

const postsResponse = { data: posts } as Awaited<ReturnType<typeof getPostsByUser>>

describe('PostList', () => {
  beforeEach(() => {
    vi.mocked(getPostsByUser).mockResolvedValue(postsResponse)
    useAppStore.setState({
      users: [],
      selectedUser: { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
      posts: [],
      searchTerm: '',
      usersLoading: false,
      postsLoading: false,
      error: null,
    })
  })

  it('muestra las publicaciones del usuario seleccionado', async () => {
    render(<PostList />)

    expect(await screen.findByText('Publicación uno')).toBeInTheDocument()
    expect(screen.getByText('Publicación dos')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Leanne Graham/ })).toBeInTheDocument()
    expect(getPostsByUser).toHaveBeenCalledWith(1)
  })

  it('muestra el estado de carga mientras llegan las publicaciones', () => {
    vi.mocked(getPostsByUser).mockReturnValue(new Promise(() => {}))
    useAppStore.setState({ postsLoading: true })

    render(<PostList />)

    expect(screen.getByRole('status')).toHaveTextContent('Cargando publicaciones')
  })

  it('muestra el error cuando falla la carga de publicaciones', async () => {
    vi.mocked(getPostsByUser).mockRejectedValue(new Error('network'))

    render(<PostList />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Error al cargar publicaciones'
    )
  })
})
