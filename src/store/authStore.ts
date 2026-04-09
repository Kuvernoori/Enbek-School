import { create } from 'zustand'

interface AuthState {
    token: string | null
    role: string | null
    isAuthenticated: boolean
    login: (token: string, role: string) => void
    logout: () => void
}

const getLocalStorage = (key: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
}

export const useAuthStore = create<AuthState>((set) => ({
    token: getLocalStorage('token'),
    role: getLocalStorage('role'),
    isAuthenticated: !!getLocalStorage('token'),

    login: (token, role) => {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        document.cookie = `token=${token}; path=/`
        set({ token, role, isAuthenticated: true })
    },

    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        set({ token: null, role: null, isAuthenticated: false })
    }
}))