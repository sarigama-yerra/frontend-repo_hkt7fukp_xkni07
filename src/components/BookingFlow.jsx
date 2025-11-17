import { useState } from 'react'

export default function BookingFlow(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const token = localStorage.getItem('token') || ''
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    pickup:'',dropoff:'',goods_type:'',weight_kg:'',volume_cbm:'',pallet_count:'',truck_type:'',pickup_datetime:''
  })
  const [quote, setQuote] = useState(null)
  const [ref, setRef] = useState('')

  const next = ()=> setStep(s=>s+1)
  const prev = ()=> setStep(s=>Math.max(0,s-1))

  const submit = async ()=>{
    const payload = { ...form, weight_kg: parseFloat(form.weight_kg||0), volume_cbm: form.volume_cbm?parseFloat(form.volume_cbm):null, pallet_count: form.pallet_count?parseInt(form.pallet_count):null, pickup_datetime: new Date(form.pickup_datetime).toISOString() }
    const res = await fetch(`${baseUrl}/customer/bookings`,{ method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify(payload) })
    const data = await res.json()
    if(res.ok){ setQuote(data.amount); setRef(data.reference); setStep(8) } else { alert(data.detail||'Error') }
  }

  const pay = async (method)=>{
    const res = await fetch(`${baseUrl}/payments/init`,{ method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ booking_reference: ref, method }) })
    const data = await res.json()
    if(res.ok){ window.open(data.pay_url,'_blank') } else { alert(data.detail||'Payment error') }
  }

  const steps = [
    {label:'Pickup', field:'pickup', type:'text', placeholder:'Johannesburg'},
    {label:'Dropoff', field:'dropoff', type:'text', placeholder:'Cape Town'},
    {label:'Goods type', field:'goods_type', type:'text', placeholder:'FMCG'},
    {label:'Weight (kg)', field:'weight_kg', type:'number', placeholder:'1000'},
    {label:'Volume (cbm)', field:'volume_cbm', type:'number', placeholder:'20'},
    {label:'Pallet count', field:'pallet_count', type:'number', placeholder:'10'},
    {label:'Truck type', field:'truck_type', type:'text', placeholder:'tautliner'},
    {label:'Pickup date & time', field:'pickup_datetime', type:'datetime-local'},
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Book a truck</h1>
        {step<8 ? (
          <div>
            <div className="mb-4 text-sm text-gray-600">Step {step+1} of 8</div>
            <div className="space-y-2">
              <label className="text-sm text-gray-700">{steps[step].label}</label>
              <input type={steps[step].type} placeholder={steps[step].placeholder} value={form[steps[step].field]} onChange={e=>setForm({...form,[steps[step].field]:e.target.value})} className="w-full border rounded-md p-2" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button onClick={prev} disabled={step===0} className="px-4 py-2 border rounded-md disabled:opacity-50">Back</button>
              {step===7 ? (
                <button onClick={submit} className="px-4 py-2 bg-emerald-600 text-white rounded-md">Get price</button>
              ) : (
                <button onClick={next} className="px-4 py-2 bg-gray-900 text-white rounded-md">Next</button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600">Estimated total</p>
            <p className="text-4xl font-bold mt-1">R{quote}</p>
            <p className="text-xs text-gray-500 mt-2">Reference: {ref}</p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">
              {['payfast','ozow','yoco','snapscan','eft'].map(m => (
                <button key={m} onClick={()=>pay(m)} className="px-3 py-2 border rounded-md hover:bg-gray-50 capitalize">{m}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
