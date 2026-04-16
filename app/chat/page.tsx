"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_QUESTION_API ||
  "https://helpcentrix-backend-production.up.railway.app/api/questions";

export default function Home() {

  // 🔥 CHAT STATE
  
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // 🔥 FORM STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  // 🔥 SEND MESSAGE
  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;

    const userMsg = { role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: issueDescription || msg,
            customer_id: "123e4567-e89b-12d3-a456-426614174000",
            name: name,
            email: email,
            phone: phone || "1234567890",
            issue_category: issueCategory,
            issue_description: issueDescription || msg,
          }),
        }
      );

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: res.ok
          ? "✅ Your question has been submitted. Expert will respond soon."
          : data.message || "❌ Error submitting question.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Server error. Try again." },
      ]);
    }
  };

  // 🔥 START CHAT (FORM SUBMIT)
  const startChat = () => {
    if (!name || !email || !phone || !issueDescription) {
      alert("Please fill all required fields: Name, Email, Phone, and Issue Description");
      return;
    }

    setChatStarted(true);
    sendMessage(issueDescription);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">

        <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold">
            Premium Expert Help, On Demand
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Get instant solutions for tech, automobile & home appliances.
          </p>

          <div className="mt-6 flex bg-white rounded-lg overflow-hidden shadow-lg">
            <input
              placeholder="Describe your issue..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="w-full p-4 text-black outline-none"
            />
            <button
              onClick={() => setChatOpen(true)}
              className="bg-blue-600 px-6 font-semibold hover:bg-blue-700"
            >
              Ask Now
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            ⭐ Trusted by 25,000+ users daily
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/80 p-6 rounded-xl shadow">⚡ Instant Answers</div>
          <div className="bg-white/80 p-6 rounded-xl shadow">👨‍🔧 Verified Experts</div>
          <div className="bg-white/80 p-6 rounded-xl shadow">💰 Affordable Help</div>
        </div>
      </section>

      {/* CHAT MODAL */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:inset-auto md:bottom-4 md:right-4 md:w-[500px] md:h-[80vh] md:bg-transparent">

          <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl w-[400px] h-[80vh] rounded-xl flex flex-col md:w-[500px] shadow-2xl border border-white/20 md:overflow-hidden">

            {/* MAC WINDOW TITLE BAR */}
            <div className="bg-gradient-to-b from-gray-100/50 to-gray-50/30 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-gray-200/30 rounded-t-xl">
              <div className="flex gap-2">
                <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition" onClick={() => { setChatOpen(false); setChatStarted(false); }} />
                <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition" disabled />
                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition" disabled />
              </div>
              <span className="text-sm font-semibold text-gray-700">Live Chat</span>
              <div className="w-12" />
            </div>

            {/* FORM */}
            {!chatStarted ? (
              <div className="p-4 space-y-3 overflow-y-auto flex-1 bg-gradient-to-b from-white/50 to-transparent">

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Name *</label>
                  <input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur border border-gray-200/50 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Email *</label>
                  <input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur border border-gray-200/50 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Phone *</label>
                  <input
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur border border-gray-200/50 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Issue Category</label>
                  <select
                    value={issueCategory}
                    onChange={(e) => setIssueCategory(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur border border-gray-200/50 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  >
                    <option value="">Select issue category</option>
                    <option value="Computer Tech">Computer Tech</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Home Appliances">Home Appliances</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Issue Description *</label>
                  <textarea
                    placeholder="Describe your issue in detail"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="w-full bg-white/60 backdrop-blur border border-gray-200/50 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
                    required
                  />
                </div>

                <button
                  onClick={startChat}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold text-sm transition shadow-lg hover:shadow-xl"
                >
                  Start Chat
                </button>

              </div>
            ) : (
              <>
                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gradient-to-b from-white/30 to-white/10">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded max-w-xs ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto shadow-md"
                          : "bg-white/60 backdrop-blur border border-gray-200/30 shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* INPUT */}
                <div className="p-3 flex gap-2 bg-gradient-to-t from-white/30 to-transparent border-t border-gray-200/20">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-white/60 backdrop-blur border border-gray-200/50 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    placeholder="Type message..."
                  />
                  <button
                    onClick={() => {
                      sendMessage(input);
                      setInput("");
                    }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 rounded-lg font-semibold text-sm transition shadow-md hover:shadow-lg"
                  >
                    Send
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </main>
  );
}