import { useEffect, useState } from 'react'

export default function OwnerDashboard(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const token = localStorage.getItem('token') || ''
  const [trucks, setTrucks] = useState([])
  const [loads, setLoads] = useState([])

  const fetchTrucks = async () => {
    const res = await fetch(`${baseUrl}/owner/trucks`, { headers: { Authorization:`Bearer ${token}` }})
    const data = await res.json()
    if(res.ok) setTrucks(data.trucks || [])
  }

  const fetchReturnLoads = async () => {
    const res = await fetch(`${baseUrl}/owner/return-loads`, { headers: { Authorization:`Bearer ${token}` }})
    const data = await res.json()
    if(res.ok) setLoads(data.return_loads || [])
  }

  useEffect(()=>{ fetchTrucks(); fetchReturnLoads() },[])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Owner Dashboard</h1>
          <a href="/owner/add-truck" className="px-4 py-2 bg-gray-900 text-white rounded-md">Add truck</a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Fleet</h2>
            <div className="space-y-3">
              {trucks.map(t => (
                <div key={t._id} className="p-3 border rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{t.truck_type} • {t.plate_number}</p>
                    <p className="text-xs text-gray-500">Capacity: {t.capacity_weight_kg}kg • Pallets: {t.pallet_capacity || 'N/A'}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-700">Active</span>
                </div>
              ))}
              {trucks.length===0 && <div className="text-sm text-gray-500">No trucks yet.</div>}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-semibold mb-3">Return loads</h2>
            <div className="space-y-3">
              {loads.map(l => (
                <div key={l._id} className="p-3 border rounded-lg">
                  <p className="text-sm">{l.from_location} → {l.to_location}</p>
                  <p className="text-xs text-gray-500">{new Date(l.date).toLocaleString()}</p>
                </div>
              ))}
              {loads.length===0 && <div className="text-sm text-gray-500">No return loads yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
