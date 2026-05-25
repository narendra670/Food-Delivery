import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getCategories = () => api.get('/menu/categories')
export const getMenuItems = (params) => api.get('/menu/items', { params })
export const getMenuItem = (id) => api.get(`/menu/items/${id}`)
export const getTestimonials = () => api.get('/menu/testimonials')
export const createOrder = (data) => api.post('/orders', data)
export const submitContact = (data) => api.post('/contact', data)
export const subscribeNewsletter = (email) => api.post('/contact/subscribe', { email })

export default api
