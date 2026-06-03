import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getMenuItems, getTestimonials } from '../api'
import toast from 'react-hot-toast'

const heroFoods = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
]

const FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f97316" opacity="0.2"%3E%3Crect width="400" height="300"/%3E%3C/svg%3E'

const categoryImgs = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80',
  indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
  salads: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
}

const itemImgs = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=300&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80',
]

function Img({ src, alt, className, ...props }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden ${className || ''}`} {...props}>
      {!loaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setImgSrc(FALLBACK)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export default function Home() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const heroRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, itemRes, testRes] = await Promise.all([
          getCategories(), getMenuItems({ limit: 8, sortBy: 'rating' }), getTestimonials(),
        ])
        setCategories(catRes.data.data)
        setItems(itemRes.data.data)
        setTestimonials(testRes.data.data)
      } catch {
        toast.error('Failed to load data')
      }
    }
    load()
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0">
          <Img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80" alt=""
            className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Floating food images - now actually showing heroFoods */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
          <div className="absolute top-[15%] right-[8%] w-36 h-36 rounded-2xl overflow-hidden shadow-2xl rotate-12 animate-float border-4 border-white/20">
            <Img src={heroFoods[0]} alt="" className="w-full h-full" />
          </div>
          <div className="absolute top-[40%] right-[3%] w-28 h-28 rounded-2xl overflow-hidden shadow-2xl -rotate-6 animate-float-delayed border-4 border-white/20">
            <Img src={heroFoods[1]} alt="" className="w-full h-full" />
          </div>
          <div className="absolute bottom-[25%] right-[12%] w-32 h-32 rounded-2xl overflow-hidden shadow-2xl rotate-45 animate-float-slow border-4 border-white/20">
            <Img src={heroFoods[2]} alt="" className="w-full h-full" />
          </div>
          <div className="absolute top-[25%] right-[22%] w-20 h-20 rounded-2xl overflow-hidden shadow-2xl -rotate-12 animate-bounce-gentle border-4 border-white/20">
            <Img src={heroFoods[3]} alt="" className="w-full h-full" />
          </div>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-1/4 left-1/2 w-4 h-4 border-2 border-primary-400/40 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 left-[55%] w-6 h-6 border-2 border-accent-400/30 rounded-full animate-float-delayed" />
        <div className="absolute bottom-1/3 left-[45%] w-3 h-3 bg-primary-500/30 rounded-full animate-bounce-gentle" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-primary-500/15 backdrop-blur-sm text-primary-300 text-sm font-semibold px-5 py-2 rounded-full mb-8 border border-primary-500/30 animate-fade-in-up">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              #1 Food Delivery Service
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.1] animate-fade-in-up">
              Delicious Food<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300">
                Delivered Fresh
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mt-6 max-w-xl leading-relaxed animate-fade-in-up-delayed">
              Your favorite meals from top restaurants, delivered hot & fresh in <span className="text-primary-400 font-semibold">30 minutes</span> or less.
            </p>
            <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up-delayed-2">
              <Link to="/menu" className="btn-primary text-lg !px-10 !py-5 relative overflow-hidden group/btn">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative">Explore Menu &rarr;</span>
              </Link>
              <Link to="/order" className="relative overflow-hidden group/btn bg-white/5 backdrop-blur-sm text-white border-2 border-white/20 hover:border-white/40 font-semibold px-10 py-5 rounded-xl transition-all duration-300 text-lg hover:bg-white/10 hover:shadow-lg hover:shadow-white/10">
                <span className="relative">Order Now</span>
              </Link>
            </div>
            <div className="flex items-center gap-10 mt-14 animate-fade-in-up-delayed-2">
              <div className="text-center">
                <span className="text-3xl font-bold text-white block">30+</span>
                <span className="text-sm text-gray-400">Restaurants</span>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div className="text-center">
                <span className="text-3xl font-bold text-white block">100+</span>
                <span className="text-sm text-gray-400">Menu Items</span>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div className="text-center">
                <span className="text-3xl font-bold text-white block">5K+</span>
                <span className="text-sm text-gray-400">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
            <path d="M0 60V30C240 0 480 0 720 15C960 30 1200 30 1440 15V60H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Categories</span>
            <h2 className="section-heading mt-2">Browse Categories</h2>
            <p className="section-sub mx-auto">Choose from our wide variety of cuisines</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5">
            {categories.map((cat, idx) => (
              <Link key={cat.id} to={`/menu?category=${cat.id}`}
                className="group card !p-5 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-gray-100 mb-4 ring-2 ring-gray-100 group-hover:ring-primary-300 transition-all duration-300 shadow-lg group-hover:shadow-primary-500/20">
                  <Img src={categoryImgs[cat.id]} alt={cat.name} className="w-full h-full" />
                </div>
                <p className="font-semibold text-gray-800 group-hover:text-primary-500 transition-colors text-base">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Menu</span>
              <h2 className="section-heading mt-2">Popular Dishes</h2>
              <p className="section-sub">Top-rated meals our customers love</p>
            </div>
            <Link to="/menu" className="btn-outline text-sm whitespace-nowrap !px-8 !py-3.5">
              View All Menu &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {items.map((item, i) => (
              <div key={item.id} className="card group hover:-translate-y-2">
                <div className="relative h-52 overflow-hidden">
                  <Img src={itemImgs[i % itemImgs.length]} alt={item.name}
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-sm font-bold text-yellow-600 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                    <span>&#9733;</span> {item.rating}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-primary-600">₹{item.price}</span>
                    <Link to={`/order?item=${item.id}`}
                      className="bg-primary-500 text-white hover:bg-primary-600 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 active:scale-95">
                      + Add
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">About Us</span>
              <h2 className="section-heading mt-3 text-5xl lg:text-6xl">We Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Flavor</span> to Your Doorstep</h2>
              <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                At FlavorDash, we believe great food should be accessible to everyone. We partner with the best local chefs and restaurants to bring you an unmatched dining experience at home. From farm-fresh ingredients to expert preparation, every meal tells a story of passion and quality.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  { n: '🚀 Fast Delivery', d: '30 min or less' },
                  { n: '🥗 Fresh Food', d: 'Prepared to order' },
                  { n: '💰 Best Price', d: 'No hidden fees' },
                  { n: '🎧 24/7 Support', d: 'Always here to help' },
                ].map((f) => (
                  <div key={f.n} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{f.n}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary inline-block mt-10 !px-10 !py-4 text-lg">Learn More About Us</Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" alt=""
                    className="rounded-2xl w-full h-52" />
                  <Img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" alt=""
                    className="rounded-2xl w-full h-60" />
                </div>
                <div className="space-y-4 mt-8">
                  <Img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" alt=""
                    className="rounded-2xl w-full h-60" />
                  <Img src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80" alt=""
                    className="rounded-2xl w-full h-52" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-[0.2em]">Testimonials</span>
            <h2 className="section-heading mt-2">What Our Customers Say</h2>
            <p className="section-sub mx-auto">Real reviews from real people</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.id} className="card !p-8 hover:-translate-y-2 relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-t-2xl" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-lg ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>&#9733;</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80" alt="" className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Savor</span> Every Bite?
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy customers. Order now and get your first delivery free!
          </p>
          <Link to="/order" className="group relative inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-primary-50 font-bold px-12 py-5 rounded-xl text-xl transition-all duration-300 shadow-2xl hover:shadow-primary-500/25">
            <span>Start Your Order</span>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-12 border-t border-white/10">
            {[
              { n: '10K+', d: 'Orders Delivered' },
              { n: '4.9', d: 'Avg. Rating' },
              { n: '50+', d: 'City Coverage' },
            ].map((s) => (
              <div key={s.n}>
                <span className="text-3xl font-bold text-white block">{s.n}</span>
                <span className="text-sm text-gray-400">{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
