import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewPostForm } from './NewPostForm'
import { useAppStore } from '../store/useAppStore'

vi.mock('../services/api')

const selectedUser = { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' }

describe('NewPostForm', () => {
  beforeEach(() => {
    useAppStore.setState({
      users: [],
      selectedUser,
      posts: [],
      searchTerm: '',
      usersLoading: false,
      postsLoading: false,
      error: null,
    })
  })

  it('muestra error si el título y el texto están vacíos', async () => {
    render(<NewPostForm />)

    await userEvent.click(screen.getByRole('button', { name: 'Publicar' }))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El texto es obligatorio')).toBeInTheDocument()
    expect(useAppStore.getState().posts).toHaveLength(0)
  })

  it('agrega la publicación al usuario seleccionado y avisa al guardar', async () => {
    const onSaved = vi.fn()
    render(<NewPostForm onSaved={onSaved} />)

    await userEvent.type(screen.getByLabelText('Título'), 'Mi primera publicación')
    await userEvent.type(screen.getByLabelText('Texto'), 'Contenido de prueba')
    await userEvent.click(screen.getByRole('button', { name: 'Publicar' }))

    expect(useAppStore.getState().posts[0]).toMatchObject({
      userId: selectedUser.id,
      title: 'Mi primera publicación',
      body: 'Contenido de prueba',
    })
    expect(onSaved).toHaveBeenCalledOnce()
  })
})
