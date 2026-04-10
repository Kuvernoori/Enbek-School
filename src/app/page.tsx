'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(!!localStorage.getItem('token'))
    }, [])
    return (
        <>
            <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --orange: #F4600C;
          --orange-light: #FF8C42;
          --orange-pale: #FFF0E8;
          --cream: #FFFAF6;
          --dark: #1A0F00;
          --gray: #6B5C4E;
          --border: rgba(244,96,12,0.15);
        }

        body {
          font-family: 'Golos Text', sans-serif;
          background: var(--cream);
          color: var(--dark);
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            radial-gradient(circle at 80% 10%, rgba(244,96,12,0.08) 0%, transparent 50%),
            radial-gradient(circle at 10% 80%, rgba(244,96,12,0.05) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 48px;
          background: rgba(255,250,246,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }

        .logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: var(--dark);
          letter-spacing: -0.5px;
          text-decoration: none;
        }

        .logo span { color: var(--orange); }

        .nav-actions { display: flex; gap: 12px; align-items: center; }

        .btn-ghost {
          font-family: 'Golos Text', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: var(--gray);
          background: none;
          border: 1.5px solid var(--border);
          border-radius: 100px;
          padding: 9px 22px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-ghost:hover { border-color: var(--orange); color: var(--orange); }

        .btn-primary {
          font-family: 'Golos Text', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          background: var(--orange);
          border: none;
          border-radius: 100px;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          background: var(--orange-light);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(244,96,12,0.3);
        }

        .btn-large { font-size: 16px; padding: 14px 32px; }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 48px 80px;
          z-index: 1;
        }

        .hero-content { max-width: 640px; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange-pale);
          border: 1px solid rgba(244,96,12,0.2);
          border-radius: 100px;
          padding: 6px 16px 6px 8px;
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease both;
        }

        .badge-dot {
          width: 8px; height: 8px;
          background: var(--orange);
          border-radius: 50%;
          animation: pulse 2s ease infinite;
        }

        .badge-text { font-size: 13px; font-weight: 500; color: var(--orange); }

        .hero-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 24px;
          animation: fadeUp 0.6s 0.1s ease both;
        }

        .hero-title .accent { color: var(--orange); }

        .hero-sub {
          font-size: 18px;
          line-height: 1.7;
          color: var(--gray);
          margin-bottom: 40px;
          max-width: 520px;
          animation: fadeUp 0.6s 0.2s ease both;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          animation: fadeUp 0.6s 0.3s ease both;
        }

        .hero-orb {
          position: absolute;
          right: 6%; top: 50%;
          transform: translateY(-50%);
          width: min(420px, 40vw);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 40%, #FF8C42, #F4600C 60%, #C83D00);
          opacity: 0.12;
          filter: blur(60px);
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-graphic {
          position: absolute;
          right: 5%; top: 50%;
          transform: translateY(-50%);
          width: min(400px, 38vw);
          animation: fadeUp 0.8s 0.2s ease both, float 6s ease-in-out infinite;
        }

        .stats {
          position: relative; z-index: 1;
          display: flex;
          padding: 0 48px 80px;
          flex-wrap: wrap;
        }

        .stat-item {
          flex: 1; min-width: 160px;
          padding: 32px 40px 32px 0;
          border-right: 1px solid var(--border);
          animation: fadeUp 0.6s ease both;
        }

        .stat-item:last-child { border-right: none; padding-right: 0; }
        .stat-item:not(:first-child) { padding-left: 40px; }

        .stat-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 40px; font-weight: 800;
          color: var(--orange);
          letter-spacing: -1px; line-height: 1;
          margin-bottom: 6px;
        }

        .stat-label { font-size: 14px; color: var(--gray); font-weight: 500; }

        .features {
          position: relative; z-index: 1;
          padding: 80px 48px;
          background: var(--orange-pale);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .section-label {
          font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--orange); margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 700; letter-spacing: -1px;
          margin-bottom: 56px; max-width: 480px; line-height: 1.2;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 20px; padding: 32px;
          transition: all 0.25s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(244,96,12,0.12);
          border-color: rgba(244,96,12,0.3);
        }

        .feature-icon {
          width: 48px; height: 48px;
          background: var(--orange-pale);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; margin-bottom: 20px;
        }

        .feature-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 16px; font-weight: 600;
          margin-bottom: 10px; letter-spacing: -0.3px;
        }

        .feature-desc { font-size: 14px; line-height: 1.65; color: var(--gray); }

        .cta-section {
          position: relative; z-index: 1;
          padding: 100px 48px;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(244,96,12,0.08), transparent 70%);
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .cta-kz {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--orange); margin-bottom: 24px;
        }

        .cta-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800; letter-spacing: -1.5px;
          line-height: 1.15; margin-bottom: 20px; max-width: 600px;
        }

        .cta-sub {
          font-size: 17px; color: var(--gray);
          line-height: 1.6; margin-bottom: 40px; max-width: 440px;
        }

        footer {
          position: relative; z-index: 1;
          border-top: 1px solid var(--border);
          padding: 32px 48px;
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }

        .footer-copy { font-size: 13px; color: var(--gray); }
        .footer-links { display: flex; gap: 24px; }

        .footer-links a {
          font-size: 13px; color: var(--gray);
          text-decoration: none; transition: color 0.2s;
        }

        .footer-links a:hover { color: var(--orange); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(calc(-50% - 16px)); }
        }

        @media (max-width: 768px) {
          .nav { padding: 16px 24px; }
          .hero { padding: 100px 24px 60px; }
          .hero-graphic { display: none; }
          .stats { padding: 0 24px 60px; }
          .stat-item { padding: 24px 20px 24px 0; }
          .features { padding: 60px 24px; }
          .cta-section { padding: 80px 24px; }
          footer { padding: 24px; }
        }
      `}</style>

            <link
                href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Golos+Text:wght@400;500;600&display=swap"
                rel="stylesheet"
            />

            <nav className="nav">
                <Link href="/" className="logo">Enbek<span>·</span>School</Link>
                <div className="nav-actions">
                    {isAuth ? (
                        <Link href="/profile" className="btn-primary">
                            Личный кабинет
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="btn-ghost">Войти</Link>
                            <Link href="/register" className="btn-primary">Регистрация</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* HERO */}
            <section className="hero">
                <div className="hero-orb" />
                <div className="hero-content">
                    <div className="hero-badge">
                        <div className="badge-dot" />
                        <span className="badge-text">Образовательная платформа Казахстана</span>
                    </div>
                    <h1 className="hero-title">
                        Учись.<br />
                        Развивайся.<br />
                        <span className="accent">Работай.</span>
                    </h1>
                    <p className="hero-sub">
                        Enbek School — платформа онлайн-обучения для студентов Казахстана.
                        Курсы от практикующих специалистов, тесты и сертификаты,
                        которые ценят работодатели.
                    </p>
                    <div className="hero-cta">
                        <Link href="/register" className="btn-primary btn-large">Начать обучение</Link>
                        <a href="#features" className="btn-ghost btn-large">Узнать больше</a>
                    </div>
                </div>

                <Image
                    src="/enbek.png"
                    alt="Enbek School"
                    width={400}
                    height={400}
                    className="hero-graphic"
                    priority
                />
            </section>

            {/* STATS */}
            <div className="stats">
                {[
                    { num: '12K+', label: 'Студентов' },
                    { num: '80+', label: 'Курсов' },
                    { num: '95%', label: 'Трудоустройство' },
                    { num: '14', label: 'Городов Казахстана' },
                ].map((s, i) => (
                    <div className="stat-item" key={i} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                        <div className="stat-num">{s.num}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* FEATURES */}
            <section className="features" id="features">
                <div className="section-label">Возможности платформы</div>
                <h2 className="section-title">Всё что нужно для роста</h2>
                <div className="features-grid">
                    {[
                        { icon: '1', title: 'Онлайн-курсы', desc: 'Структурированные программы от IT до бизнеса. Учись в своём темпе из любой точки Казахстана.' },
                        { icon: '2', title: 'Тесты и квизы', desc: 'Проверяй знания после каждого модуля. Мгновенная обратная связь и детальная аналитика прогресса.' },
                        { icon: '3', title: 'Сертификаты', desc: 'Получай сертификаты по завершении курсов. Признаются ведущими работодателями страны.' },
                        { icon: '4', title: 'Карьерная поддержка', desc: 'Помощь с трудоустройством, ревью резюме и связь с партнёрами — компаниями Казахстана.' },
                    ].map((f, i) => (
                        <div className="feature-card" key={i}>
                            <div className="feature-icon">{f.icon}</div>
                            <div className="feature-title">{f.title}</div>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {!isAuth && (
                <section className="cta-section">
                    <h2 className="cta-title">Начни свой путь сегодня</h2>
                    <p className="cta-sub">
                        Присоединяйся к тысячам студентов, которые уже строят карьеру с Enbek School.
                    </p>
                    <Link href="/register" className="btn-primary btn-large">
                        Создать аккаунт бесплатно
                    </Link>
                </section>
            )}

            {/* FOOTER */}
            <footer>
                <Link href="/" className="logo">Enbek<span>·</span>School</Link>
                <div className="footer-copy">© 2026 Enbek School. Казахстан</div>
                <div className="footer-links">
                    <a href="#">О нас</a>
                    <a href="#">Курсы</a>
                    <a href="#">Контакты</a>
                </div>
            </footer>
        </>
    );
}