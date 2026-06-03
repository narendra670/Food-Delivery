import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCategories, getMenuItems } from '../api'
import toast from 'react-hot-toast'

const FALLBACK_IMG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f97316" opacity="0.2"%3E%3Crect width="400" height="300"/%3E%3C/svg%3E'

const itemImgs = [
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
  'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80',
]

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const category = searchParams.get('category') || 'all'
  const sortBy = searchParams.get('sortBy') || ''

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes] = await Promise.all([getCategories()])
        setCategories(catRes.data.data)
      } catch { toast.error('Failed to load categories') }
    }
    load()
  }, [])

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true)
      try {
        const params = {}
        if (category && category !== 'all') params.category = category
        if (search) params.search = search
        if (sortBy) params.sortBy = sortBy
        const { data } = await getMenuItems(params)
        setItems(data.data)
      } catch { toast.error('Failed to load menu') }
      setLoading(false)
    }
    loadItems()
  }, [category, search, sortBy])

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== 'all') params.set(key, value)
    else params.delete(key)
    setSearchParams(params)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateParams('search', search)
  }

  return (
    <>
      {/* Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="section-heading">Our Menu</h1>
            <p className="section-sub mx-auto">Explore our carefully crafted selection of dishes</p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dishes..." className="input-field pl-10 pr-4" />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 bg-white border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => updateParams('category', 'all')}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              All
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => updateParams('category', cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {cat.name}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500">{loading ? 'Loading...' : `${items.length} items`}</p>
            <select value={sortBy} onChange={(e) => updateParams('sortBy', e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-primary-500 bg-white">
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-200 rounded w-16" />
                      <div className="h-8 bg-gray-200 rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl">🍽️</span>
              <p className="text-xl font-semibold text-gray-600 mt-4">No items found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, i) => (
                <div key={item.id} className="card group">
                  <div className="relative h-48 overflow-hidden">
                    <img src={itemImgs[i % itemImgs.length]} alt={item.name}
                      onError={(e) => { e.target.src = FALLBACK_IMG }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-sm font-bold text-yellow-600 px-2.5 py-1 rounded-lg">
                      &#9733; {item.rating}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.desc}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-primary-600">₹{item.price}</span>
                      <Link to={`/order?item=${item.id}`}
                        className="bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                        Add to Order
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
