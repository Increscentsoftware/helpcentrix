"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  // 🔥 STATE
  const [pendingMessage, setPendingMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // 🔥 SEND MESSAGE
  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;

    const userMsg = { role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(
        "https://helpcentrix-backend-production.up.railway.app/api/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: msg,
            customer_id: "123e4567-e89b-12d3-a456-426614174000",
            name: "User",
            email: "user@example.com",
            phone: "1234567890",
            issue_category: "General",
          }),
        }
      );

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: res.ok
          ? "✅ Your question has been submitted. An expert will respond soon."
          : data.message || "❌ Error submitting question.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Server error. Try again." },
      ]);
    }
  };

  // 🔥 HANDLE CHAT

  const handleChat = () => {
  if (!question.trim()) return;

  setPendingMessage(question);   // store message
  setChatOpen(true);             // open modal
  setQuestion("");               // clear input
};
useEffect(() => {
  if (chatOpen && pendingMessage) {
    sendMessage(pendingMessage);
    setPendingMessage("");
  }
}, [chatOpen]);

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
              type="text"
              placeholder="Describe your issue..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-4 text-black outline-none"
            />
            <button
              onClick={handleChat}
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
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow">
            ⚡ Instant Answers
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow">
            👨‍🔧 Verified Experts
          </div>
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl shadow">
            💰 Affordable Help
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Popular Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Computer Tech",
              icon: "💻",
              img: "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg",
            },
            {
              title: "Automobile",
              icon: "🚗",
              img: "https://img.freepik.com/free-vector/car-repair-concept-illustration_114360-1896.jpg",
            },
            {
              title: "Home Appliances",
              icon: "🏠",
              img: "https://img.freepik.com/free-vector/home-appliance-concept-illustration_114360-5032.jpg",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl shadow hover:shadow-2xl transition bg-gray-50 hover:-translate-y-2"
            >
              <Image
                src={item.img}
                width={300}
                height={200}
                alt={item.title}
              />

              <h3 className="text-xl font-bold mt-4">
                {item.icon} {item.title}
              </h3>

              <button
                onClick={() => setChatOpen(true)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Start Chat
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA + HOW IT WORKS */}
      <section className="relative py-28 px-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white overflow-hidden">

        <div className="absolute inset-0 opacity-20 blur-3xl bg-white"></div>

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Problem Solved Instantly ⚡
            </h2>

            <p className="text-lg text-gray-200 mb-6">
              Experts are online 24/7. Average response time under 2 minutes.
            </p>

            <button
              onClick={() => setChatOpen(true)}
              className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold"
            >
              Start Chat Now
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white/10 p-8 rounded-2xl text-center">
              📝 Ask Your Question
            </div>
            <div className="bg-white p-8 rounded-2xl text-center text-black">
              👨‍🔧 Get Matched
            </div>
            <div className="bg-white/10 p-8 rounded-2xl text-center">
              💬 Solve Your Problem
            </div>
          </div>
        </div>
      </section>

      {/* CHAT MODAL */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50">
          <div className="bg-white w-full md:w-[500px] h-[80vh] rounded-t-2xl md:rounded-2xl flex flex-col">

            {/* HEADER */}
            <div className="bg-blue-600 text-white p-4 flex justify-between">
              <span>Live Chat</span>
              <button onClick={() => setChatOpen(false)}>✖</button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-xs ${
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
            <div className="p-4 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
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

          </div>
        </div>
      )}
    </main>
  );
}