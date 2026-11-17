import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export function NewPostForm() {
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
    };

    if (!selectedUser) return null;

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nueva publicación</h3>
            <div>
                <label>Título</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    aria-invalid={!!errors.title}
                />
                {errors.title && <span role="alert">{errors.title}</span>}
            </div>
            <div>
                <label>Texto</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    aria-invalid={!!errors.body}
                />
                {errors.body && <span role="alert">{errors.body}</span>}
            </div>
            <button type="submit">Publicar</button>
        </form>
    );
}