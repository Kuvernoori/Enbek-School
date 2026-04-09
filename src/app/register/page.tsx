'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export default function RegisterPage() {
    const [form, setForm] = useState({
        phone: '',
        firstName: '',
        lastName: '',
        secondName: '',
        birthDate: '',
        role: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const login = useAuthStore(s => s.login)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const response = await authApi.register({
                phone: form.phone,
                firstName: form.firstName,
                lastName: form.lastName || undefined,
                secondName: form.secondName || undefined,
                birthDate: form.birthDate || undefined,
                role: form.role || undefined,
                email: form.email || undefined,
                password: form.password,
            })

            login(response.data.token, response.data.role)
            router.push('/profile')

        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка регистрации')
        } finally {
            setLoading(false)
        }
        if (form.birthDate) {
            const birth = new Date(form.birthDate);
            if (isNaN(birth.getTime())) {
                setError('Неверный формат даты рождения');
                setLoading(false);
                return;
            }
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FFFAF6',
            padding: '24px',
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '40px',
                width: '100%',
                maxWidth: '460px',
                border: '1px solid rgba(244,96,12,0.15)',
                boxShadow: '0 16px 48px rgba(244,96,12,0.08)',
            }}>
                <Link href="/" style={{
                    fontFamily: 'sans-serif',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#1A0F00',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '28px',
                }}>
                    Enbek<span style={{ color: '#F4600C' }}>·</span>School
                </Link>

                <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
                    Регистрация
                </h1>
                <p style={{ fontSize: '14px', color: '#6B5C4E', marginBottom: '28px' }}>
                    Уже есть аккаунт?{' '}
                    <Link href="/login" style={{ color: '#F4600C', textDecoration: 'none' }}>
                        Войти
                    </Link>
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            Телефон *
                        </label>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            Имя *
                        </label>
                        <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                                Фамилия
                            </label>
                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                                Отчество
                            </label>
                            <input
                                name="secondName"
                                value={form.secondName}
                                onChange={handleChange}

                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            BirthDate
                        </label>
                        <input
                            name="birthDate"
                            type="date"
                            value={form.birthDate}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="example@mail.kz"
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            Пароль *
                        </label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Минимум 6 символов"
                            required
                            style={inputStyle}
                        />
                    </div>

                    {error && (
                        <div style={{
                            background: '#FFF0E8',
                            border: '1px solid rgba(244,96,12,0.3)',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            fontSize: '14px',
                            color: '#C83D00',
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: loading ? '#ccc' : '#F4600C',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '100px',
                            padding: '14px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            marginTop: '4px',
                        }}
                    >
                        {loading ? 'Загрузка...' : 'Создать аккаунт'}
                    </button>
                </form>
            </div>
        </div>
    )
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    border: '1.5px solid rgba(244,96,12,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '15px',
    outline: 'none',
    background: '#FFFAF6',
    color: '#1A0F00',
    transition: 'border-color 0.2s',
}