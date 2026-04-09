'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { profileApi, UserResponse } from '@/services/api'
import { useAuthStore } from '@/store/authStore'

export default function ProfilePage() {
    const [user, setUser] = useState<UserResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { isAuthenticated, logout } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/login')
            return
        }
        profileApi.getMe()
            .then(res => setUser(res.data))
            .catch((err) => {
                if (err.response?.status === 401) {
                    logout()
                    router.push('/login')
                } else {
                    setError('Не удалось загрузить профиль')
                }
            })
            .finally(() => setLoading(false))
    }, [])

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

    const roleLabel = (role: string) => {
        const map: Record<string, string> = {
            ADMIN: 'Администратор',
            STUDENT: 'Студент',
        }
        return map[role] ?? role
    }

    const initials = user
        ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
        : '?'

    if (loading) return (
        <div style={styles.centered}>
            <div style={styles.spinner} />
        </div>
    )

    if (error) return (
        <div style={styles.centered}>
            <p style={{ color: '#e05a00', fontFamily: 'Georgia, serif' }}>{error}</p>
        </div>
    )

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.avatarRing}>
                        <div style={styles.avatar}>{initials}</div>
                    </div>
                    <div style={styles.headerInfo}>
                        <h1 style={styles.name}>
                            {user?.firstName} {user?.lastName ?? ''} {user?.secondName ?? ''}
                        </h1>
                        <span style={styles.roleBadge}>{roleLabel(user?.role ?? '')}</span>
                    </div>
                </div>

                <div style={styles.divider} />

                {/* Info grid */}
                <div style={styles.grid}>
                    <InfoRow icon="" label="Телефон" value={user?.phone ?? '—'} />
                    <InfoRow icon="" label="Email" value={user?.email ?? '—'} />
                    <InfoRow icon="" label="Имя" value={user?.firstName ?? '—'} />
                    <InfoRow icon="" label="Фамилия" value={user?.lastName ?? '—'} />
                    <InfoRow icon="" label="Отчество" value={user?.secondName ?? '—'} />
                    <InfoRow icon="" label="Дата рождения" value={user?.birthDate ?? '—'} />
                    <InfoRow icon="" label="Дата регистрации" value={user?.createdAt ? formatDate(user.createdAt) : '—'} />
                </div>

                <div style={styles.divider} />

                {/* Actions */}
                <div style={styles.actions}>
                    <button style={styles.btnSecondary} onClick={() => router.push('/profile/edit')}>
                        Редактировать профиль
                    </button>
                    <button style={styles.btnDanger} onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div style={styles.infoRow}>
            <span style={styles.infoIcon}>{icon}</span>
            <div>
                <p style={styles.infoLabel}>{label}</p>
                <p style={styles.infoValue}>{value}</p>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: '#fdf5ee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
    },
    centered: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fdf5ee',
    },
    spinner: {
        width: 40,
        height: 40,
        border: '4px solid #f0d9c8',
        borderTop: '4px solid #e05a00',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    card: {
        background: '#ffffff',
        borderRadius: 20,
        boxShadow: '0 8px 40px rgba(224,90,0,0.10)',
        padding: '40px 36px',
        width: '100%',
        maxWidth: 520,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 8,
    },
    avatarRing: {
        padding: 3,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #e05a00, #ffb347)',
        flexShrink: 0,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: '#fff3ea',
        color: '#e05a00',
        fontSize: 26,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #fff',
    },
    headerInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    name: {
        margin: 0,
        fontSize: 22,
        fontWeight: 700,
        color: '#1a1a1a',
        lineHeight: 1.2,
    },
    roleBadge: {
        display: 'inline-block',
        background: '#fff3ea',
        color: '#e05a00',
        fontSize: 12,
        fontWeight: 600,
        padding: '3px 12px',
        borderRadius: 20,
        border: '1px solid #ffd4b0',
    },
    divider: {
        height: 1,
        background: '#f0e6dc',
        margin: '24px 0',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px 12px',
    },
    infoRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        background: '#fdf7f3',
        borderRadius: 12,
        padding: '12px 14px',
    },
    infoIcon: {
        fontSize: 18,
        marginTop: 2,
    },
    infoLabel: {
        margin: 0,
        fontSize: 11,
        color: '#aaa',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    infoValue: {
        margin: '2px 0 0',
        fontSize: 14,
        color: '#2a2a2a',
        fontWeight: 600,
        wordBreak: 'break-word',
    },
    actions: {
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
    },
    btnSecondary: {
        flex: 1,
        padding: '12px 20px',
        borderRadius: 12,
        border: '2px solid #e05a00',
        background: 'transparent',
        color: '#e05a00',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    btnDanger: {
        flex: 1,
        padding: '12px 20px',
        borderRadius: 12,
        border: 'none',
        background: 'linear-gradient(135deg, #e05a00, #ff7a1a)',
        color: '#fff',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
}
