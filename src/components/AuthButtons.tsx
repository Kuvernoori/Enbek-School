'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export default function AuthButtons() {
    const { isAuthenticated, logout } = useAuthStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!mounted) {
        return <div style={{ width: '240px' }} />; // placeholder
    }

    if (isAuthenticated) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link
                    href="/profile"
                    className="btn-primary"
                >
                    Личный кабинет
                </Link>

                <button
                    onClick={handleLogout}
                    className="btn-ghost"
                >
                    Выйти
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login" className="btn-ghost">
                Войти
            </Link>
            <Link href="/register" className="btn-primary">
                Регистрация
            </Link>
        </div>
    );
}