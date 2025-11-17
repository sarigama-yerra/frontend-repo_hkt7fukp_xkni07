import { useEffect, useState } from 'react'

export default function CustomerDashboard(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [list, setList] = useState([])
  const token = localStorage.getItem('token') || ''

  const fetchBookings = async () => {
    if(!token) return
    const res = await fetch(`${baseUrl}/customer/bookings`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if(res.ok) setList(data.bookings || [])
  }

  useEffect(()=>{ fetchBookings() },[])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Customer Dashboard</h1>
          <a href="/customer/book" className="px-4 py-2 bg-emerald-600 text-white rounded-md">New booking</a>
        </div>
        <div className="grid gap-4">
          {list.map((b)=> (
            <div key={b._id} className="border bg-white rounded-lg p-4">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{b.pickup} → {b.dropoff}</p>
                  <p className="text-xs text-gray-500">{b.goods_type} • {b.weight_kg}kg • {b.truck_type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R{b.price_total}</p>
                  <p className="text-xs text-gray-500">{b.status}</p>
                </div>
              </div>
            </div>
          ))}
          {list.length===0 && <div className="p-8 text-center text-gray-500 border rounded-lg bg-white">No bookings yet.</div>}
        </div>
      </div>
    </div>
  )
}
