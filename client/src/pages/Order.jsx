import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMenuItems, createOrder } from '../api'
import toast from 'react-hot-toast'

const itemImgs = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=200&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80',
]

export default function Order() {
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [cart, setCart] = useState({})
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' })
  const [address, setAddress] = useState({ street: '', city: '', zip: '' })
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getMenuItems({ limit: 100 })
        setItems(data.data)
        const preSelect = searchParams.get('item')
        if (preSelect) {
          setCart({ [preSelect]: 1 })
        }
      } catch { toast.error('Failed to load menu') }
    }
    load()
  }, [searchParams])

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.desc.toLowerCase().includes(search.toLowerCase())
  )

  const addToCart = (item) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }))
    toast.success(`${item.name} added!`)
  }

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      const newCart = { ...cart }
      delete newCart[id]
      setCart(newCart)
    } else {
      setCart((prev) => ({ ...prev, [id]: qty }))
    }
  }

  const cartItems = items.filter((i) => cart[i.id])
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * (cart[i.id] || 0), 0)
  const deliveryFee = subtotal >= 30 ? 0 : 2.99
  const total = parseFloat((subtotal + deliveryFee).toFixed(2))

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!customer.name.trim() || !customer.email.trim() || !address.street.trim() || !address.city.trim()) {
      return toast.error('Please fill in all required fields')
    }
    if (cartItems.length === 0) return toast.error('Your cart is empty')
    setSubmitting(true)
    try {
      const { data } = await createOrder({
        customer: { name: customer.name.trim(), email: customer.email.trim() },
        deliveryAddress: { street: address.street.trim(), city: address.city.trim() },
        items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: cart[i.id] })),
        paymentMethod,
        notes,
      })
      toast.success('Order placed successfully!')
      setCart({})
      setCustomer({ name: '', email: '', phone: '' })
      setAddress({ street: '', city: '', zip: '' })
      setNotes('')
      setShowSummary(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="section-heading">Place Your Order</h1>
          <p className="section-sub mx-auto">Browse our menu, add items to your cart, and checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu items..." className="input-field pl-10" />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((item, i) => (
                <div key={item.id} className="card flex overflow-hidden">
                  <div className="w-24 h-24 shrink-0">
                    <img src={itemImgs[i % itemImgs.length]} alt={item.name}
                      className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
                      <p className="text-gray-500 text-xs line-clamp-1">{item.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-primary-600 text-sm">${item.price.toFixed(2)}</span>
                      {cart[item.id] ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQty(item.id, cart[item.id] - 1)}
                            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors">-</button>
                          <span className="w-6 text-center text-sm font-semibold">{cart[item.id]}</span>
                          <button onClick={() => updateQty(item.id, cart[item.id] + 1)}
                            className="w-7 h-7 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-600 flex items-center justify-center text-sm font-bold transition-colors">+</button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)}
                          className="bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-10">No items match your search</p>
            )}
          </div>

          {/* Order Summary / Form */}
          <div className="lg:col-span-1">
            <div className="card !p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {cartItems.length > 0 ? `Your Cart (${cartItems.length})` : 'Your Cart'}
              </h2>

              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <span className="text-5xl">🛒</span>
                  <p className="text-gray-500 text-sm mt-4">Your cart is empty</p>
                  <p className="text-gray-400 text-xs mt-1">Add items from the menu</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">${item.price.toFixed(2)} x {cart[item.id]}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-sm font-semibold text-gray-900">${(item.price * cart[item.id]).toFixed(2)}</span>
                          <button onClick={() => updateQty(item.id, cart[item.id] - 1)}
                            className="text-gray-400 hover:text-red-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery Fee</span><span className="font-medium">{deliveryFee === 0 ? <span className="text-accent-600 font-semibold">FREE</span> : `$${deliveryFee.toFixed(2)}`}</span></div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-2"><span>Total</span><span className="text-primary-600">${total.toFixed(2)}</span></div>
                  </div>

                  <button onClick={() => setShowSummary(true)}
                    className="btn-primary w-full mt-4 text-sm">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-10 md:pt-20 px-4 overflow-y-auto"
          onClick={() => setShowSummary(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Info</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Full Name *" value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="input-field text-sm" required />
                  <input type="email" placeholder="Email *" value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="input-field text-sm" required />
                </div>
                <input type="tel" placeholder="Phone (optional)" value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="input-field text-sm mt-3" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Address</label>
                <input type="text" placeholder="Street Address *" value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="input-field text-sm" required />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <input type="text" placeholder="City *" value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="input-field text-sm" required />
                  <input type="text" placeholder="ZIP Code" value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="input-field text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  {['cash', 'card'].map((m) => (
                    <button key={m} type="button" onClick={() => setPaymentMethod(m)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        paymentMethod === m ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                      {m === 'cash' ? '💵 Cash' : '💳 Card'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                  placeholder="Any special requests?"
                  className="input-field text-sm resize-none" />
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Items</span><span className="font-medium">{cartItems.length}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Delivery</span><span className="font-medium">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-xl font-bold border-t border-gray-100 pt-2"><span>Total</span><span className="text-primary-600">${total.toFixed(2)}</span></div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowSummary(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-all">
                  Back
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 btn-primary text-sm disabled:opacity-50">
                  {submitting ? 'Placing Order...' : `Place Order • $${total.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
