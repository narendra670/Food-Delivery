import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'

const team = [
  { name: 'Marco Rossi', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Sakura Tanaka', role: 'Sushi Master', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Raj Patel', role: 'Indian Cuisine Chef', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
  { name: 'Lisa Chen', role: 'Pastry Chef', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
]

const milestones = [
  { year: '2020', title: 'The Beginning', desc: 'FlavorDash was founded with a vision to connect food lovers with the best local restaurants.' },
  { year: '2021', title: 'First 100 Partners', desc: 'We onboarded 100+ restaurants and expanded across the city with lightning-fast delivery.' },
  { year: '2023', title: '1 Million Orders', desc: 'Celebrated our 1 millionth order. Our community grew beyond expectations.' },
  { year: '2024', title: 'Nationwide Launch', desc: 'Expanded to 20+ cities nationwide, bringing flavor to every doorstep.' },
  { year: '2025', title: 'AI-Powered Delivery', desc: 'Launched AI-driven routing for the fastest delivery times in the industry.' },
]

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary-900 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mt-4">
            More Than Just <span className="text-primary-400">Food Delivery</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            We're on a mission to make great food accessible to everyone. From humble beginnings to a nationwide
            community, every meal we deliver tells a story of passion, quality, and care.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="section-heading mt-2">Bringing People Together Through Food</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Food is more than sustenance — it's connection, culture, and joy. At FlavorDash, we're building
                a platform that celebrates culinary diversity while supporting local businesses. Every order
                strengthens our community and brings smiles to tables across the country.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10">
                {[
                  { n: '50+', d: 'Cities' },
                  { n: '500+', d: 'Restaurants' },
                  { n: '5M+', d: 'Delivered' },
                ].map((s) => (
                  <div key={s.n} className="text-center p-4 bg-primary-50 rounded-2xl">
                    <p className="text-2xl md:text-3xl font-bold text-primary-600">{s.n}</p>
                    <p className="text-sm text-gray-600 mt-1">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" alt=""
                className="rounded-2xl w-full h-80 object-cover shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 hidden md:block">
                <p className="text-4xl">🍕</p>
                <p className="font-bold text-gray-900 mt-2">5+ Years</p>
                <p className="text-sm text-gray-500">of serving flavor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Journey</h2>
            <p className="section-sub mx-auto">How we grew from a dream to a nationwide service</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:flex md:w-1/2 justify-end">
                    {i % 2 === 0 && (
                      <div className="bg-white p-6 rounded-2xl shadow-md">
                        <span className="text-primary-500 font-bold text-sm">{m.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{m.title}</h3>
                        <p className="text-gray-600 mt-2">{m.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex md:hidden items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-md flex-1">
                      <span className="text-primary-500 font-bold text-sm">{m.year}</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-1">{m.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-8 h-8 rounded-full bg-primary-500 text-white items-center justify-center text-sm font-bold shrink-0 absolute left-1/2 -translate-x-1/2 z-10">
                    {i + 1}
                  </div>
                  <div className="hidden md:flex md:w-1/2">
                    {i % 2 !== 0 && (
                      <div className="bg-white p-6 rounded-2xl shadow-md">
                        <span className="text-primary-500 font-bold text-sm">{m.year}</span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{m.title}</h3>
                        <p className="text-gray-600 mt-2">{m.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Meet Our Chefs</h2>
            <p className="section-sub mx-auto">The culinary artists behind every amazing meal</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden ring-4 ring-primary-100 group-hover:ring-primary-300 transition-all">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 mt-4">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">What We Stand For</h2>
            <p className="section-sub mx-auto">Our core values drive everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🥗', title: 'Fresh Ingredients', desc: 'We source only the freshest, highest quality ingredients from trusted suppliers.' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Our optimized delivery network ensures your food arrives hot and fresh in 30 minutes.' },
              { icon: '🤝', title: 'Community First', desc: 'We support local restaurants and give back to the communities we serve.' },
              { icon: '🌱', title: 'Sustainable', desc: 'Eco-friendly packaging and carbon-neutral delivery across all our operations.' },
            ].map((v) => (
              <div key={v.title} className="card !p-8 text-center hover:-translate-y-1">
                <span className="text-5xl">{v.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-4">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
              <h2 className="section-heading mt-2">Send Us a Message</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Have a question, feedback, or want to partner with us? We'd love to hear from you.
                Our team typically responds within 24 hours.
              </p>
              <div className="space-y-4 mt-8">
                {[
                  { icon: '📍', label: 'Address', value: '123 Flavor Street, Foodie City, FC 10001' },
                  { icon: '📧', label: 'Email', value: 'hello@flavordash.com' },
                  { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: '🕐', label: 'Hours', value: 'Mon-Sun: 9:00 AM - 11:00 PM' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{c.label}</p>
                      <p className="text-gray-600 text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card !p-6 md:!p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Want to Partner With Us?</h2>
          <p className="text-primary-100 text-lg mt-4 max-w-xl mx-auto">Join 500+ restaurants already growing with FlavorDash.</p>
          <Link to="/order" className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-xl text-lg mt-8 transition-all hover:bg-primary-50 shadow-xl">
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  )
}
