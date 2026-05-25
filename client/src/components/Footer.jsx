import { Link } from 'react-router-dom'
import { subscribeNewsletter } from '../api'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) return toast.error('Please enter your email')
    setLoading(true)
    try {
      const { data } = await subscribeNewsletter(email)
      toast.success(data.message)
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍕</span>
              <span className="text-xl font-display font-bold text-white">
                Flavor<span className="text-primary-400">Dash</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Delivering happiness to your doorstep. Fresh, delicious meals from the best local restaurants, prepared with love and delivered with care.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((s) => (
                <a key={s} href={`#${s}`} className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Our Menu' },
                { to: '/about', label: 'About Us' },
                { to: '/order', label: 'Order Now' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get exclusive deals and updates!</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" className="flex-1 px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 focus:border-primary-500 outline-none text-sm text-white placeholder-gray-500" />
              <button type="submit" disabled={loading}
                className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all">
                {loading ? '...' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FlavorDash. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
