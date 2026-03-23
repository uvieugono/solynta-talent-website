"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const API_BASE = "https://solyntaflow.uc.r.appspot.com";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showPulse, setShowPulse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show pulse animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch initial suggestions
  useEffect(() => {
    if (isOpen && suggestions.length === 0 && messages.length === 0) {
      const url = typeof window !== "undefined" ? window.location.pathname : "";
      fetch(`${API_BASE}/api/customer-service/chat/suggestions/?url=${encodeURIComponent(url)}`)
        .then((r) => r.json())
        .then((data) => setSuggestions(data.suggestions || []))
        .catch(() =>
          setSuggestions([
            "What services do you offer?",
            "How much does it cost?",
            "How is this different from hiring?",
          ])
        );
    }
  }, [isOpen, suggestions.length, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setSuggestions([]);
      setLoading(true);

      try {
        const sourceUrl =
          typeof window !== "undefined" ? window.location.href : "";
        const res = await fetch(`${API_BASE}/api/customer-service/chat/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            session_id: sessionId,
            source_url: sourceUrl,
          }),
        });

        if (!res.ok) throw new Error("Chat API error");

        const data = await res.json();
        setSessionId(data.session_id);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
        if (data.suggestions?.length) {
          setSuggestions(data.suggestions);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I'm having trouble connecting. You can reach us at hello@solyntatalent.com or book a call at calendly.com/uvieugono",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, sessionId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowPulse(false);
          }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-teal flex items-center justify-center shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/30 hover:scale-105 transition-all duration-300 group"
          aria-label="Open chat"
        >
          {/* Pulse ring */}
          {showPulse && (
            <span className="absolute inset-0 rounded-full bg-teal/30 animate-ping" />
          )}
          {/* Chat icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="relative z-10"
          >
            <path
              d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.55 6.8 19.75L3 21L4.25 17.2C3.45 15.8 3 14.2 3 12.5C3 7.25 7.25 3 12.5 3C17.75 3 21 6.25 21 11.5Z"
              stroke="#0a0e1a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="12" r="1" fill="#0a0e1a" />
            <circle cx="12.5" cy="12" r="1" fill="#0a0e1a" />
            <circle cx="16" cy="12" r="1" fill="#0a0e1a" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl border border-white/10 bg-navy/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-slate-dark/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-teal/15 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                      fill="#00d4aa"
                      fillOpacity="0.3"
                    />
                    <path
                      d="M12 6C9.79 6 8 7.79 8 10s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM12 18c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"
                      fill="#00d4aa"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-navy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white-soft">
                  Solynta Talent
                </p>
                <p className="text-[11px] text-teal">AI Sales Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ghost hover:text-white-soft hover:bg-white/5 transition-colors"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1L13 13M1 13L13 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 chat-scrollbar">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="bg-slate-dark/60 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-white/5">
                  <p className="text-sm text-white-soft/90 leading-relaxed">
                    Hi! I&apos;m the Solynta Talent AI assistant. I can answer
                    questions about our services and pricing — or if you&apos;re
                    ready, you can book a call directly with our founder.
                  </p>
                </div>

                {/* Book a call CTA */}
                <a
                  href="https://calendly.com/uvieugono"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal text-midnight text-xs font-semibold hover:bg-teal/90 transition-colors ml-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book a Strategy Call
                </a>

                {/* Suggestion chips */}
                {suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pl-1">
                    {suggestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-xs text-teal hover:bg-teal/10 hover:border-teal/30 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-teal/15 text-white-soft rounded-tr-sm border border-teal/10"
                      : "bg-slate-dark/60 text-white-soft/90 rounded-tl-sm border border-white/5"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-2" : ""}>
                      {/* Auto-link URLs */}
                      {line.split(/(https?:\/\/[^\s]+)/g).map((part, k) =>
                        part.match(/^https?:\/\//) ? (
                          <a
                            key={k}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal underline underline-offset-2 hover:text-teal/80"
                          >
                            {part.includes("calendly")
                              ? "Book a call"
                              : part.length > 40
                                ? part.slice(0, 40) + "..."
                                : part}
                          </a>
                        ) : (
                          <span key={k}>{part}</span>
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Suggestion chips after messages */}
            {suggestions.length > 0 && messages.length > 0 && !loading && (
              <div className="flex flex-wrap gap-2 pl-1">
                {suggestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 rounded-full border border-teal/20 bg-teal/5 text-xs text-teal hover:bg-teal/10 hover:border-teal/30 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-dark/60 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-teal/50 animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 rounded-full bg-teal/50 animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 rounded-full bg-teal/50 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-white/5 bg-slate-dark/30"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                maxLength={1000}
                disabled={loading}
                className="flex-1 bg-midnight/60 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white-soft placeholder:text-ghost/40 focus:outline-none focus:border-teal/30 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-teal/15 flex items-center justify-center text-teal hover:bg-teal/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                aria-label="Send message"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-ghost/30 text-center mt-2">
              Powered by Solynta Talent AI
            </p>
          </form>
        </div>
      )}
    </>
  );
}
