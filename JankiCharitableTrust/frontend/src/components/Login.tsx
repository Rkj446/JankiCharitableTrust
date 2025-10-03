import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import api from '../lib/axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await api.post('/api/auth/login', { username, password })
      const token = res.data?.token
      if (token) {
        localStorage.setItem('token', token)
        navigate('/dashboard')
      } else {
        setError('Unexpected response')
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <section className="py-12 px-4 flex justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-card p-6 shadow border border-border">
        <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        {error && <div className="text-destructive mt-3 text-sm">{error}</div>}
        <Button type="submit" className="mt-5 w-full bg-primary text-primary-foreground">Sign In</Button>
      </form>
    </section>
  )
}


