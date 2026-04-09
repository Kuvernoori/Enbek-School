'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const login = useAuthStore(s => s.login)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const response = await authApi.login({ phone, password })
            login(response.data.token, response.data.role)

            if (response.data.role === 'ADMIN') {
                router.push('/admin')
            } else {
                router.push('/profile')
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Неверный телефон или пароль')
        } finally {
            setLoading(false)
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
                maxWidth: '400px',
                border: '1px solid rgba(244,96,12,0.15)',
                boxShadow: '0 16px 48px rgba(244,96,12,0.08)',
            }}>
                <Link href="/" style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#1A0F00',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: '28px',
                }}>
                    Enbek<span style={{ color: '#F4600C' }}>·</span>School
                </Link>

                <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Вход</h1>
                <p style={{ fontSize: '14px', color: '#6B5C4E', marginBottom: '28px' }}>
                    Нет аккаунта?{' '}
                    <Link href="/register" style={{ color: '#F4600C', textDecoration: 'none' }}>
                        Зарегистрироваться
                    </Link>
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            Телефон
                        </label>
                        <input
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+77001234567"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div>
                        <label style={{ fontSize: '13px', color: '#6B5C4E', display: 'block', marginBottom: '6px' }}>
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••"
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
                            marginTop: '4px',
                        }}
                    >
                        {loading ? 'Загрузка...' : 'Войти'}
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
}