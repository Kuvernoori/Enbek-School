'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { profileApi, UserResponse } from '@/services/api'

export default function EditProfilePage() {
    const [form, setForm] = useState({ firstName: '', lastName: '', secondName: '', email: '', birthDate: '' })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) { router.push('/login'); return }

        profileApi.getMe().then(res => {
            const u = res.data
            setForm({
                firstName: u.firstName ?? '',
                lastName: u.lastName ?? '',
                secondName: u.secondName ?? '',
                email: u.email ?? '',
                birthDate: u.birthDate ?? '',
            })
        }).finally(() => setLoading(false))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError(null)
        try {
            await profileApi.updateProfile({
                firstName: form.firstName || undefined,
                lastName: form.lastName || undefined,
                secondName: form.secondName || undefined,
                email: form.email || undefined,
                birthDate: form.birthDate || undefined,
            })
            setSuccess(true)
            setTimeout(() => router.push('/profile'), 1200)
        } catch {
            setError('Не удалось сохранить изменения')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFAF6' }}>
                <div style={{ width: 36, height: 36, border: '4px solid #fde0cc', borderTop: '4px solid #F4600C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
        </>
    )

    return (
        <div style={{ minHeight: '100vh', background: '#FFFAF6', fontFamily: "'Segoe UI', sans-serif" }}>

            {/* NAV */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 40px',
                background: 'rgba(255,250,246,0.9)', backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(244,96,12,0.12)',
            }}>
                <Link href="/" style={{ fontFamily: 'sans-serif', fontSize: '18px', fontWeight: 800, color: '#1A0F00', textDecoration: 'none' }}>
                    Enbek<span style={{ color: '#F4600C' }}>·</span>School
                </Link>
                <span style={{ color: '#D4C4BC', fontSize: 16 }}>→</span>
                <Link href="/profile" style={{ fontSize: 14, color: '#9B8B7E', textDecoration: 'none' }}>Профиль</Link>
                <span style={{ color: '#D4C4BC', fontSize: 16 }}>→</span>
                <span style={{ fontSize: 14, color: '#F4600C', fontWeight: 600 }}>Редактирование</span>
            </nav>

            <div style={{ maxWidth: 500, margin: '0 auto', padding: '100px 24px 48px' }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A0F00', marginBottom: 8 }}>Редактировать профиль</h1>
                <p style={{ fontSize: 14, color: '#9B8B7E', marginBottom: 32 }}>Измени только нужные поля</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                        { name: 'firstName', label: 'Имя', placeholder: '' },
                        { name: 'lastName', label: 'Фамилия', placeholder: '' },
                        { name: 'secondName', label: 'Отчество', placeholder: '' },
                        { name: 'birthDate', label: 'Дата рождения', placeholder: '01.01.1970', type: 'date'},
                        { name: 'email', label: 'Email', placeholder: 'example@mail.kz', type: 'email' },
                    ].map(field => (
                        <div key={field.name}>
                            <label style={{ fontSize: 13, color: '#6B5C4E', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                {field.label}
                            </label>
                            <input
                                name={field.name}
                                type={field.type ?? 'text'}
                                value={(form as any)[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                style={{
                                    width: '100%', border: '1.5px solid rgba(244,96,12,0.2)',
                                    borderRadius: 12, padding: '11px 14px', fontSize: 15,
                                    outline: 'none', background: '#FFFAF6', color: '#1A0F00',
                                    boxSizing: 'border-box',
                                }}
                            />
                        </div>
                    ))}

                    {error && (
                        <div style={{ background: '#FFF0E8', border: '1px solid rgba(244,96,12,0.3)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#C83D00' }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ background: '#F0FFF4', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#15803d' }}>
                            Сохранено! Перенаправляем...
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                        <Link href="/profile" style={{
                            background: '#fff', border: '1.5px solid rgba(244,96,12,0.3)',
                            borderRadius: 14, padding: '13px', textAlign: 'center',
                            fontSize: 15, fontWeight: 600, color: '#F4600C', textDecoration: 'none',
                        }}>
                            Отмена
                        </Link>
                        <button type="submit" disabled={saving} style={{
                            background: saving ? '#ccc' : '#F4600C', color: '#fff',
                            border: 'none', borderRadius: 14, padding: '13px',
                            fontSize: 15, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                        }}>
                            {saving ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}