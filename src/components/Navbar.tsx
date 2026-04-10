'use client';

import Link from 'next/link';
import AuthButtons from './AuthButtons';

export default function Navbar() {
    return (
        <nav style={{ }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>

                <Link href="/" style={{ fontSize: '24px', fontWeight: 800, color: '#1A0F00' }}>
                    Enbek<span style={{ color: '#F4600C' }}>·</span>School
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>

                    <AuthButtons />
                </div>
            </div>
        </nav>
    );
}