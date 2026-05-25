import { useState } from 'react'
import { submitContact } from '../api'
import toast from 'react-hot-toast'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Name is required')
    if (!form.email.trim()) return toast.error('Email is required')
    if (!form.message.trim() || form.message.trim().length < 15) return toast.error('Message must be at least 15 characters')
    setLoading(true)
    try {
      const { data } = await submitContact(form)
      toast.success(data.message)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Your Name *" value={form.name}
          onChange={handleChange} className="input-field text-sm" />
        <input type="email" name="email" placeholder="Your Email *" value={form.email}
          onChange={handleChange} className="input-field text-sm" />
      </div>
      <input type="text" name="subject" placeholder="Subject" value={form.subject}
        onChange={handleChange} className="input-field text-sm" />
      <textarea name="message" rows={4} placeholder="Your Message * (at least 15 characters)" value={form.message}
        onChange={handleChange} className="input-field text-sm resize-none" />
      <button type="submit" disabled={loading}
        className="btn-primary w-full text-sm disabled:opacity-50">
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
