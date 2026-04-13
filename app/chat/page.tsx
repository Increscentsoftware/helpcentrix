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
  const [category, setCategory] = useState("");
  const [issue, setIssue] = useState("");

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
            question: msg,
            customer_id: "123e4567-e89b-12d3-a456-426614174000",
            name: name,
            email: email,
            phone: "1234567890",
            issue_category: category,
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
    if (!name || !email || !category || !issue) {
      alert("Please fill all fields");
      return;
    }

    setChatStarted(true);
    sendMessage(issue);
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
              onChange={(e) => setIssue(e.target.value)}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[400px] h-[80vh] rounded-xl flex flex-col">

            {/* HEADER */}
            <div className="bg-blue-600 text-white p-4 flex justify-between">
              <span>Live Chat</span>
              <button onClick={() => setChatOpen(false)}>✖</button>
            </div>

            {/* FORM */}
            {!chatStarted ? (
              <div className="p-4 space-y-3">

                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Category</option>
                  <option>Computer Tech</option>
                  <option>Automobile</option>
                  <option>Home Appliances</option>
                </select>

                <textarea
                  placeholder="Describe your issue..."
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                <button
                  onClick={startChat}
                  className="w-full bg-blue-600 text-white py-2 rounded"
                >
                  Start Chat
                </button>

              </div>
            ) : (
              <>
                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-100">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded max-w-xs ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white ml-auto"
                          : "bg-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* INPUT */}
                <div className="p-3 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder="Type message..."
                  />
                  <button
                    onClick={() => {
                      sendMessage(input);
                      setInput("");
                    }}
                    className="bg-blue-600 text-white px-4 rounded"
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