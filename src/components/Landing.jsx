import { Link } from 'react-router-dom'
import { Truck, ArrowRight, ShieldCheck, CreditCard, MessageSquare } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Truck className="h-5 w-5" />
            </div>
            <span>LoadEase</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">Sign in</Link>
            <Link to="/auth?mode=signup" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium flex items-center gap-2">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Seamless South African freight, simplified.
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Book reliable trucks, accept high-quality loads, and avoid empty returns with built-in return load intelligence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/customer" className="px-5 py-3 bg-gray-900 text-white rounded-md text-sm font-medium">I need a truck</Link>
                <Link to="/owner" className="px-5 py-3 bg-white border rounded-md text-sm font-medium">I have trucks</Link>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600"/>Verified carriers</div>
                <div className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-emerald-600"/>PayFast • Ozow • Yoco • SnapScan • EFT</div>
                <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-emerald-600"/>Realtime messaging</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl border bg-white shadow-sm p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                    <p className="text-sm font-medium text-emerald-700">Customer</p>
                    <p className="text-xs text-emerald-800">Create a booking in minutes</p>
                  </div>
                  <div className="p-4 rounded-lg bg-sky-50 border border-sky-100">
                    <p className="text-sm font-medium text-sky-700">Owner</p>
                    <p className="text-xs text-sky-800">Accept loads and manage fleet</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-lg bg-gray-50 border">
                    <p className="text-sm font-medium text-gray-700">Return Loads</p>
                    <p className="text-xs text-gray-600">Automatic B→A listings remove empty trips</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 border-t bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            {[
              {title: 'Booking engine', desc: 'Pickup to payment in one flow with transparent pricing.'},
              {title: 'Owner suite', desc: 'Register company, upload docs, add trucks, track earnings.'},
              {title: 'Realtime updates', desc: 'Live status, messaging, and notifications.'},
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-xl border bg-gradient-to-b from-gray-50 to-white">
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="py-16 bg-gradient-to-br from-emerald-50 to-white border-t">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold">Simple, predictable pricing</h2>
            <p className="text-gray-600 mt-2">Monthly plans via PayFast recurring billing</p>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                {name:'Starter', price:'R399', features:['5 trucks','Email support']},
                {name:'Pro', price:'R999', features:['25 trucks','Priority support']},
                {name:'Enterprise', price:'Custom', features:['Unlimited trucks','Dedicated SLA']},
              ].map(p => (
                <div key={p.name} className="p-6 rounded-xl border bg-white">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-3xl font-bold mt-2">{p.price}<span className="text-base text-gray-500">/mo</span></p>
                  <ul className="mt-4 space-y-1 text-sm text-gray-600">
                    {p.features.map(x => <li key={x}>• {x}</li>)}
                  </ul>
                  <Link to="/owner" className="mt-6 inline-flex px-4 py-2 bg-gray-900 text-white rounded-md text-sm">Choose {p.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} LoadEase. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
