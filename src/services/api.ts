import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export interface AuthResponse {
    token: string
    role: string
}

export interface UserResponse {
    id: number
    phone: string
    role: string
    firstName: string
    lastName: string | null
    secondName: string | null
    birthDate: string | null
    email: string | null
    createdAt: string
    updatedAt: string
}

export const authApi = {
    register: (data: {
        phone: string
        firstName: string
        lastName?: string
        secondName?: string
        birthDate?: string
        role?: string
        email?: string
        password: string
}) => api.post<AuthResponse>("/auth/register", data),
    login: (data: {
        phone: string
        password: string
    })=> api.post<AuthResponse>("/auth/login", data),
}

export const profileApi = {
    getMe: () => api.get<UserResponse>("/api/profile"),

    updateProfile: (data: {
        firstName?: string
        lastName?: string
        secondName?: string
        email?: string
    })=> api.patch<UserResponse>("/api/profile", data),

    updatePassword: (data: {
        oldPassword: string
        newPassword: string
    })=> api.patch<UserResponse>("/api/profile/password", data),
}

export default api