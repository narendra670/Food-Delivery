import { addContact, addSubscriber } from "../data/store.js"

export const submitContact = (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name?.trim() || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: "Name must be at least 2 characters" })
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Valid email is required" })
  }
  if (!message?.trim() || message.trim().length < 15) {
    return res.status(400).json({ success: false, message: "Message must be at least 15 characters" })
  }

  const contact = addContact({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject?.trim() || "",
    message: message.trim(),
  })

  res.status(201).json({ success: true, message: "Message sent successfully", data: contact })
}

export const subscribeNewsletter = (req, res) => {
  const { email } = req.body

  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Valid email is required" })
  }

  const subscriber = addSubscriber(email.trim().toLowerCase())

  if (subscriber.alreadyExists) {
    return res.json({ success: true, message: "You're already subscribed!", data: subscriber })
  }

  res.status(201).json({ success: true, message: "Successfully subscribed!", data: subscriber })
}
