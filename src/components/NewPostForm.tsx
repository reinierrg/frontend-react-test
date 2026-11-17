import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export function NewPostForm({ onSaved }: { onSaved?: () => void }) {
    const { selectedUser, addPost } = useAppStore();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!title.trim()) newErrors.title = 'El título es obligatorio';
        if (!body.trim()) newErrors.body = 'El texto es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate() || !selectedUser) return;

        addPost({
            id: Date.now(),
            userId: selectedUser.id,
            title,
            body,
        });
        setTitle('');
        setBody('');
        setErrors({});
        onSaved?.();
    };

    if (!selectedUser) return null;

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto' }}>
            <h3 style={{ textAlign: 'center' }}>Nueva publicación</h3>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <label style={{ display: 'block' }}>Título</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-invalid={!!errors.title}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                {errors.title && <span role="alert">{errors.title}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <label style={{ display: 'block' }}>Texto</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    aria-invalid={!!errors.body}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                />
                {errors.body && <span role="alert">{errors.body}</span>}
            </div>
            <button type="submit" style={{ display: 'block', margin: '10px auto' }}>Publicar</button>
        </form>
    );
}