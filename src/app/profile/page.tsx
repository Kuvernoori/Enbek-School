'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { profileApi, UserResponse } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export default function ProfilePage() {
    const [user, setUser] = useState<UserResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const { logout } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { router.push('/login'); return }

        profileApi.getMe()
            .then(res => setUser(res.data))
            .catch((err) => {
                if (err.response?.status === 401) { logout(); router.push('/login') }
            })
            .finally(() => setLoading(false))
    }, [])

    const handleLogout = () => { logout(); router.push('/') }

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

    const initials = user
        ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
        : '?'

    if (loading) return (
        <>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFAF6' }}>
                <div style={{ width: 40, height: 40, border: '4px solid #fde0cc', borderTop: '4px solid #F4600C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
        </>
    )

    return (
        <>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                .edit-btn:hover { background: #F4600C !important; color: #fff !important; }
                .logout-btn:hover { opacity: 0.85; }
                .info-card:hover { border-color: rgba(244,96,12,0.3) !important; transform: translateY(-2px); }
                .info-card { transition: all 0.2s; }
            `}</style>

            <div style={{ minHeight: '100vh', background: '#FFFAF6', fontFamily: "'Segoe UI', sans-serif" }}>

                <nav style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 40px',
                    background: 'rgba(255,250,246,0.9)', backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(244,96,12,0.12)',
                }}>
                    <Link href="/" style={{ fontFamily: 'sans-serif', fontSize: '18px', fontWeight: 800, color: '#1A0F00', textDecoration: 'none', letterSpacing: '-0.5px' }}>
                        Enbek<span style={{ color: '#F4600C' }}>·</span>School
                    </Link>
                    <button onClick={handleLogout} className="logout-btn" style={{
                        background: 'none', border: '1.5px solid rgba(244,96,12,0.3)',
                        borderRadius: '100px', padding: '8px 20px',
                        fontSize: '14px', color: '#F4600C', cursor: 'pointer', fontWeight: 500,
                    }}>
                        Выйти
                    </button>
                </nav>

                <div style={{ paddingTop: 80, maxWidth: 700, margin: '0 auto', padding: '100px 24px 48px' }}>

                    <div style={{
                        background: '#fff', borderRadius: 24,
                        border: '1px solid rgba(244,96,12,0.12)',
                        boxShadow: '0 8px 32px rgba(244,96,12,0.08)',
                        padding: '32px', marginBottom: 20,
                        display: 'flex', alignItems: 'center', gap: 24,
                        animation: 'fadeUp 0.4s ease both',
                    }}>

                        <div style={{
                            width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
                            background: 'linear-gradient(135deg, #F4600C, #FF8C42)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 28, fontWeight: 700, color: '#fff',
                        }}>
                            {initials}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#1A0F00' }}>
                                {user?.firstName} {user?.lastName ?? ''} {user?.secondName ?? ''}
                            </h1>
                            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                                <span style={{
                                    background: '#FFF0E8', color: '#F4600C',
                                    fontSize: 12, fontWeight: 600,
                                    padding: '4px 12px', borderRadius: 100,
                                    border: '1px solid rgba(244,96,12,0.2)',
                                }}>
                                    {user?.role === 'ADMIN' ? 'Администратор' : 'Студент'}
                                </span>
                                <span style={{ fontSize: 13, color: '#9B8B7E', alignSelf: 'center' }}>
                                    с {user?.createdAt ? formatDate(user.createdAt) : '—'}
                                </span>
                            </div>
                        </div>
                        <Link href="/profile/edit" style={{
                            background: '#fff', border: '1.5px solid #F4600C',
                            borderRadius: 12, padding: '10px 20px',
                            fontSize: 14, fontWeight: 600, color: '#F4600C',
                            textDecoration: 'none', whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                        }} className="edit-btn">
                            Редактировать
                        </Link>
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                        marginBottom: 20, animation: 'fadeUp 0.4s 0.1s ease both',
                    }}>
                        {[
                            { label: 'Телефон', value: user?.phone },
                            { label: 'Email', value: user?.email },
                            { label: 'Имя', value: user?.firstName },
                            { label: 'Фамилия', value: user?.lastName },
                            { label: 'Отчество', value: user?.secondName },
                            { label: 'Дата рождения', value: user?.birthDate },
                        ].map((item, i) => (
                            <div key={i} className="info-card" style={{
                                background: '#fff', borderRadius: 16, padding: '16px 20px',
                                border: '1px solid rgba(244,96,12,0.1)',
                            }}>
                                <p style={{ margin: 0, fontSize: 11, color: '#B0A099', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                                    {item.label}
                                </p>
                                <p style={{ margin: 0, fontSize: 15, color: item.value ? '#1A0F00' : '#C8BBAF', fontWeight: 600 }}>
                                    {item.value ?? '—'}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                        animation: 'fadeUp 0.4s 0.2s ease both',
                    }}>
                        <Link href="/profile/edit" style={{
                            background: '#F4600C', color: '#fff', borderRadius: 16,
                            padding: '16px', textAlign: 'center',
                            fontSize: 15, fontWeight: 600, textDecoration: 'none',
                            display: 'block',
                        }}>
                            Редактировать профиль
                        </Link>
                        <Link href="/profile/password" style={{
                            background: '#fff', color: '#F4600C',
                            border: '1.5px solid rgba(244,96,12,0.3)',
                            borderRadius: 16, padding: '16px', textAlign: 'center',
                            fontSize: 15, fontWeight: 600, textDecoration: 'none',
                            display: 'block',
                        }}>
                            Сменить пароль
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}