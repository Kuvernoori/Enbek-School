'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { profileApi } from '@/services/api'

export default function ChangePasswordPage() {
    const[form,setForm] = useState({oldPassword:'', newPassword:'', confirmPassword:''})
    const[saving, setSaving] = useState(false)
    const[success, setSuccess] = useState(false)
    const[error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({... prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault()
        setError(null)

        if (form.newPassword !== form.confirmPassword) {
            setError('Новые пароли не совпадают')
            return
        }

        if (form.newPassword.length < 6) {
            setError('Пароль должен быть минимум из 6 символов')
            return
        }
        setSaving(true)
        try {
            await profileApi.updatePassword({
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
            })
            setSuccess(true)
            setTimeout(()=>router.push('/login'), 1500)
        } catch (err: any) {
            setError(err.response?.data?.error?.message || 'Неверный старый пароль')

        } finally {
            setSaving(false)
        }
    }
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
                <Link href="/" style={{ fontSize: '18px', fontWeight: 800, color: '#1A0F00', textDecoration: 'none' }}>
                    Enbek<span style={{ color: '#F4600C' }}>·</span>School
                </Link>
                <span style={{ color: '#D4C4BC' }}>→</span>
                <Link href="/profile" style={{ fontSize: 14, color: '#9B8B7E', textDecoration: 'none' }}>Профиль</Link>
                <span style={{ color: '#D4C4BC' }}>→</span>
                <span style={{ fontSize: 14, color: '#F4600C', fontWeight: 600 }}>Смена пароля</span>
            </nav>

            <div style={{ maxWidth: 460, margin: '0 auto', padding: '100px 24px 48px' }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A0F00', marginBottom: 8 }}>Смена пароля</h1>
                <p style={{ fontSize: 14, color: '#9B8B7E', marginBottom: 32 }}>Введи старый пароль и придумай новый</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                        { name: 'oldPassword', label: 'Старый пароль', placeholder: '••••••' },
                        { name: 'newPassword', label: 'Новый пароль', placeholder: 'Минимум 6 символов' },
                        { name: 'confirmPassword', label: 'Повторите новый пароль', placeholder: '••••••' },
                    ].map(field => (
                        <div key={field.name}>
                            <label style={{ fontSize: 13, color: '#6B5C4E', display: 'block', marginBottom: 6, fontWeight: 500 }}>
                                {field.label}
                            </label>
                            <input
                                name={field.name}
                                type="password"
                                value={(form as any)[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                required
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
                            Пароль изменён! Перенаправляем...
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
                            {saving ? 'Сохранение...' : 'Изменить пароль'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
