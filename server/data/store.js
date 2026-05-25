import { readFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const loadJSON = (file) => {
  const path = join(__dirname, file)
  if (!existsSync(path)) return []
  return JSON.parse(readFileSync(path, "utf-8"))
}

let categories = loadJSON("categories.json")
let menuItems = loadJSON("menuItems.json")
let testimonials = loadJSON("testimonials.json")
let orders = []
let contacts = []
let subscribers = []

export const getStore = () => ({ categories, menuItems, testimonials, orders, contacts, subscribers })

export const resetStore = () => {
  categories = loadJSON("categories.json")
  menuItems = loadJSON("menuItems.json")
  testimonials = loadJSON("testimonials.json")
  orders = []
  contacts = []
  subscribers = []
}

export const addOrder = (order) => {
  const newOrder = { _id: String(orders.length + 1), ...order, createdAt: new Date().toISOString() }
  orders.unshift(newOrder)
  return newOrder
}

export const addContact = (contact) => {
  const newContact = { _id: String(contacts.length + 1), ...contact, read: false, createdAt: new Date().toISOString() }
  contacts.unshift(newContact)
  return newContact
}

export const addSubscriber = (email) => {
  const exists = subscribers.find((s) => s.email === email)
  if (exists) return { ...exists, alreadyExists: true }
  const newSub = { _id: String(subscribers.length + 1), email, active: true, createdAt: new Date().toISOString() }
  subscribers.push(newSub)
  return newSub
}
