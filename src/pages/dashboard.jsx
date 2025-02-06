"use client"

import { useState } from "react"
import Head from "next/head"

export default function Dashboard() {
  const [quote, setQuote] = useState("Believe you can and you're halfway there.")
  const [reminder, setReminder] = useState("Have you done your burpees today?")

  const handleQuoteChange = (e) => {
    setQuote(e.target.value)
  }

  const handleReminderChange = (e) => {
    setReminder(e.target.value)
  }

  const handleSave = () => {
    // TODO: Implement saving to backend
    console.log("Saving preferences:", { quote, reminder })
    alert("Preferences saved!")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - AdFriend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">AdFriend Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Customize Your Content</h2>
          <div className="mb-4">
            <label htmlFor="quote" className="block text-gray-700 font-bold mb-2">
              Motivational Quote
            </label>
            <input
              type="text"
              id="quote"
              value={quote}
              onChange={handleQuoteChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="reminder" className="block text-gray-700 font-bold mb-2">
              Activity Reminder
            </label>
            <input
              type="text"
              id="reminder"
              value={reminder}
              onChange={handleReminderChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save Preferences
          </button>
        </div>
      </main>
    </div>
  )
}

