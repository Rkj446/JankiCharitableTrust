import { Navigate } from 'react-router-dom'

function isTokenValid(token: string | null): boolean {
  if (!token) return false
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = typeof window !== 'undefined' ? window.atob(base64) : Buffer.from(base64, 'base64').toString('binary')
    const payload = JSON.parse(json) as { exp?: number }
    if (payload?.exp && Math.floor(Date.now() / 1000) >= payload.exp) {
      return false
    }
    return true
  } catch {
    return false
  }
}

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const valid = isTokenValid(token)
  if (!valid) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    return <Navigate to="/login" replace />
  }
  return children
}



