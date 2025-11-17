import { Routes, Route, Link } from 'react-router-dom'
import Landing from './components/Landing'
import Auth from './components/Auth'
import CustomerDashboard from './components/CustomerDashboard'
import OwnerDashboard from './components/OwnerDashboard'
import AdminDashboard from './components/AdminDashboard'
import BookingFlow from './components/BookingFlow'

function Shell({children}){
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-bold">LoadEase</Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/customer" className="hover:underline">Customer</Link>
            <Link to="/owner" className="hover:underline">Owner</Link>
            <Link to="/admin" className="hover:underline">Admin</Link>
          </div>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/auth" element={<Shell><Auth/></Shell>} />
      <Route path="/customer" element={<Shell><CustomerDashboard/></Shell>} />
      <Route path="/customer/book" element={<Shell><BookingFlow/></Shell>} />
      <Route path="/owner" element={<Shell><OwnerDashboard/></Shell>} />
      <Route path="/admin" element={<Shell><AdminDashboard/></Shell>} />
    </Routes>
  )
}
