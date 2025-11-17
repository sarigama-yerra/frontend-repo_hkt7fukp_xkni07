import { useEffect, useState } from 'react'

export default function AdminDashboard(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const token = localStorage.getItem('token') || ''
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(()=>{
    const fetchAll = async () => {
      const u = await fetch(`${baseUrl}/admin/users`, { headers: { Authorization:`Bearer ${token}` }})
      const b = await fetch(`${baseUrl}/admin/bookings`, { headers: { Authorization:`Bearer ${token}` }})
      const uj = await u.json(); const bj = await b.json()
      if(u.ok) setUsers(uj.users || [])
      if(b.ok) setBookings(bj.bookings || [])
    }
    fetchAll()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Users</h2>
            <div className="space-y-2">
              {users.map(u => (
                <div key={u._id} className="p-3 border rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email} • {u.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Bookings</h2>
            <div className="space-y-2">
              {bookings.map(b => (
                <div key={b._id} className="p-3 border rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm">{b.pickup} → {b.dropoff}</p>
                    <p className="text-xs text-gray-500">{b.status} • R{b.price_total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
