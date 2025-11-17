import { useEffect, useState } from 'react'

export default function Auth() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('customer')
  const [token, setToken] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const qmode = params.get('mode')
    if (qmode) setMode(qmode)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const endpoint = mode === 'signup' ? '/auth/register' : '/auth/login'
      const payload = mode === 'signup' ? { email, password, name, role } : { email, password }
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok) {
        setToken(data.access_token)
        localStorage.setItem('token', data.access_token)
        alert('Success! Token saved.')
      } else {
        alert(data.detail || 'Error')
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-emerald-50 p-6">
      <form onSubmit={submit} className="w-full max-w-md bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-bold">{mode === 'signup' ? 'Create account' : 'Sign in'}</h1>
        {mode === 'signup' && (
          <>
            <div>
              <label className="text-sm text-gray-600">Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-md p-2" required />
            </div>
            <div>
              <label className="text-sm text-gray-600">Role</label>
              <select value={role} onChange={e=>setRole(e.target.value)} className="mt-1 w-full border rounded-md p-2">
                <option value="customer">Customer</option>
                <option value="owner">Truck Owner</option>
              </select>
            </div>
          </>
        )}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full border rounded-md p-2" required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full border rounded-md p-2" required />
        </div>
        <button className="w-full py-2 bg-gray-900 text-white rounded-md">{mode === 'signup' ? 'Sign up' : 'Sign in'}</button>
        {token && <p className="text-xs break-all text-gray-600">Token: {token}</p>}
      </form>
    </div>
  )
}
